/* globals Platform, Buffs */
if (typeof(module) != 'undefined') {
  Platform = require("./game-platform");
  Buffs = require("./game-buffs");
}

class Game {
  constructor(stationName, platformIds) {
    this.ticks = 0;
    this.status = "inactive";
    this.platforms = [];
    this.possibleActions = [
      "clean", "vent", "something"
    ];
    
    this.queuedActions = [];
        
    for (let id of platformIds) {
      this.platforms.push(new Platform(id));
    }
  }
  
  start() {
    this.tickInterval = setInterval(() => {
      this.tick();
    }, 1 * 1000);
    this.status = "active";
  }
  
  tick() {
    this.ticks++;
         
    const gameOverCheck = this.isGameOver(this);
    if (gameOverCheck.gameover) {
      this.endGame(gameOverCheck.message);
      return;
    }   
    
    // handle user input actions    
    while (this.queuedActions.length > 0) {
      const action = this.queuedActions.shift();
      const handlerName = action.key + "Buff";
      const target = this.platforms.filter(p => p.id == action.target)[0];      
      target.buffs.push(this.createBuff(handlerName));
    }    
     
    for (let platform of this.platforms) {
      platform.tick();
    }
  }

  createBuff(name) {   
    try { 
      if (typeof(Buffs) !== "undefined") {
        return new Buffs[name]();
      } else {
        return (Function('return new ' + name))();
      }
    } catch (ex) {
      console.log(ex);
      throw "Could not find handler called " + name;
    }
  }
  
  isGameOver() {    
    const failureConditions = [
      { condition: (g) => (g.platforms.filter(p => p.temperature >= 50).length > 0), message: "It's too hot!" },
      { condition: (g) => (g.platforms.filter(p => p.temperature <= -20).length > 0), message: "It's too cold!" },
      { condition: (g) => (g.platforms.filter(p => p.hygiene <= 0).length > 0), message: "It's too disgusting!" },
      { condition: (g) => (g.platforms.filter(p => p.contents.length >= p.capacity).length > 0), message: "Your platforms are too full!" }
    ];
    
    for (let c of failureConditions) {
      if (c.condition(this)) {
        return { gameover: true, message: c.message };
      }
    }
    
    return { gameover: false };
  }
  
  endGame(message) {
    this.status = "ended";
    this.gameovermsg = message;
    clearInterval(this.tickInterval);    
  }
  
  queueAction(key, target) {
    if (this.queuedActions.length >= 3) return; // Rate limit actions to 3 per tick.  
    this.queuedActions.push({ key: key, target: target })
  }
  
  registerEvent(current, ablyMessage) {
    const matchingPlatform = current.platforms.filter(p => p.id === ablyMessage.line)[0];
    matchingPlatform.unprocessedMessages.push(ablyMessage);
  }
}

if (typeof(module) != 'undefined') {
  module.exports = Game;
}