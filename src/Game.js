const ticksPerSecond = require("./Config").ticksPerSecond;
const Platform = require("./entities/Platform");

const CleanBuff = require("./buffs/CleanBuff");
const MusicBuff = require("./buffs/MusicBuff");
const VentBuff = require("./buffs/VentBuff");

const nothing = () => { };

const buffs = { 
  CleanBuff,
  MusicBuff,
  VentBuff
};

class Game {
  constructor(platformIds, onGameOver) {
    this.ticks = 0;
    this.status = "inactive";
    this.platforms = [];    
    this.queuedActions = [];
    this.onGameOver = onGameOver || nothing;
        
    for (let id of platformIds) {
      this.platforms.push(new Platform(id));
    }
  }
  
  start() {
    this.tickInterval = setInterval(() => {
      this.tick();
    }, 1000 / ticksPerSecond);
    this.status = "active";
  }
  
  tick() {
    this.ticks++;
         
    const gameOverCheck = this.isGameOver(this);    
    if (gameOverCheck.gameover) {      
      this.status = "ended";
      this.gameover = gameOverCheck;
      this.gameovermsg = gameOverCheck.message;
      clearInterval(this.tickInterval);      
      
      console.log("☠ Game ended");
      this.onGameOver(this);
      return;
    }   
    
    // handle user input actions    
    while (this.queuedActions.length > 0) {
      const action = this.queuedActions.shift();
      const handlerName = action.key.charAt(0).toUpperCase() + action.key.slice(1) + "Buff";
      const target = this.platforms.filter(p => p.id == action.target)[0];      
      const handler = this.createBuff(handlerName);
      target.buffs.push(handler);
    }    
     
    for (let platform of this.platforms) {
      platform.tick();
    }
  }

  createBuff(name) {   
    try {
      return new buffs[name]();      
    } catch (ex) {
      throw "Could not find handler called " + name;
    }
  }
  
  isGameOver() {    
    const failureConditions = [
      { condition: (g) => (g.platforms.filter(p => p.temperature >= 60).length > 0), message: "It's too hot!" },
      { condition: (g) => (g.platforms.filter(p => p.temperature <= -20).length > 0), message: "It's too cold!" },
      { condition: (g) => (g.platforms.filter(p => p.hygiene <= 0).length > 0), message: "It's too disgusting!" },
      { condition: (g) => (g.platforms.filter(p => p.contents.length >= p.capacity).length > 0), message: "Your platforms are too full!" }
    ];
    
    for (let index in failureConditions) {
      const c = failureConditions[index];
      if (c.condition(this)) {
        return { gameover: true, message: c.message, conditionId: index };
      }
    }
    
    return { gameover: false };
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

module.exports = Game;