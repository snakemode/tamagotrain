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
    
    // check for failure state here, whatever that is
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