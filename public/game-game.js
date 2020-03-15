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
      
    }    
  }
  
  queueAction(key, target) {
    this.queuedActions.push({ })
  }
  
  registerEvent(current, ablyMessage) {
    console.log("Register event", ablyMessage);
    const matchingPlatform = current.platforms.filter(p => p.id === ablyMessage.line)[0];
    matchingPlatform.unprocessedMessages.push(ablyMessage);
  }
}


function cleanHandler(game) {
  
}

function ventHandler(game) {
  
}

function somethingHandler(game) {
  
}


if (typeof(module) != 'undefined') {
  module.exports = { Game }
}