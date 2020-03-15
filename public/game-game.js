/* globals Platform */

class Game {
  constructor(stationName, platformIds) {
    this.ticks = 0;
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
    setInterval(() => this.tick(this), 1 * 1000);
  }
  
  tick(current) {    
    current.ticks++;
    
    for (let platform of current.platforms) {
      platform.tick();
    }
    
    // handle user input actions    
    while (this.queuedActions.length > 0) {
      const action = this.queuedActions.shift();
      const handlerName = action.key + "Buff";
      const target = this.platforms.filter(p=>p.id == action.target);
      const instance = (Function('return new ' + handlerName))();
      target.buffs.push(instance);
      
      
    }    
  }
  
  queueAction(key, target) {
    this.queuedActions.push({ key: key, platform: target })
  }
  
  registerEvent(current, ablyMessage) {
    console.log("Register event", ablyMessage);
    const matchingPlatform = current.platforms.filter(p => p.id === ablyMessage.line)[0];
    matchingPlatform.unprocessedMessages.push(ablyMessage);
  }
}

class cleanBuff {
  constructor() {
    this.ticks = 0;
    this.completed = false;
  }
  
  execute() {
    this.completed = true;
  }
}

class ventBuff {
  constructor() {
    this.ticks = 0;
    this.completed = false;
  }
  
  execute() {
    this.completed = true;
  }
}

class somethingBuff {
  constructor() {
    this.ticks = 0;
    this.completed = false;
  }
  
  execute() {
    this.completed = true;
  } 
}



if (typeof(module) != 'undefined') {
  module.exports = { Game }
}