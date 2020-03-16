/* globals Platform */

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
    this.tickInterval = setInterval(() => this.tick(this), 1 * 1000);
    this.status = "active";
  }
  
  tick(current) {    
    current.ticks++;
            
    const failureConditions = [
      {
        condition: (g) => (g.platforms.filter(p => p.temperature >= 50).length > 0),
        message: "It's too hot!"
      },
      {
        condition: (g) => (g.platforms.filter(p => p.contents >= p.capacity).length > 0),
        message: "Your platforms are too full!"
      }
    ];
    
    for (let c of failureConditions) {
      if(c.condition(current)) {
        current.endGame(c.message);
        break;
      }
    }    
    
    // handle user input actions    
    while (current.queuedActions.length > 0) {
      const action = current.queuedActions.shift();
      const handlerName = action.key + "Buff";
      const target = current.platforms.filter(p => p.id == action.target)[0];
      
      const instance = (Function('return new ' + handlerName))();
      target.buffs.push(instance);
    }    
     
    for (let platform of current.platforms) {
      platform.tick();
    }
  }
  
  isGameOver(current) {
    const failureConditions = [
      {
        condition: (g) => (g.platforms.filter(p => p.temperature >= 50).length > 0),
        message: "It's too hot!"
      },
      {
        condition: (g) => (g.platforms.filter(p => p.contents >= p.capacity).length > 0),
        message: "Your platforms are too full!"
      }
    ];
    
    for (let c of failureConditions) {
      if(c.condition(current)) {
        current.endGame(c.message);
        return true;
      }
    }
    
    return false;
  }
  
  endGame(message) {
    this.status = "ended";
    this["game-over-message"] = message;
    clearInterval(this.tickInterval);    
  }
  
  queueAction(key, target) {
    this.queuedActions.push({ key: key, target: target })
  }
  
  registerEvent(current, ablyMessage) {
    const matchingPlatform = current.platforms.filter(p => p.id === ablyMessage.line)[0];
    matchingPlatform.unprocessedMessages.push(ablyMessage);
  }
}

if (typeof(module) != 'undefined') {
  module.exports = { Game }
}