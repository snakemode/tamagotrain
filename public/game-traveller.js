/* globals uuidv4, Vomit */
if (typeof(module) != 'undefined') {  
  uuidv4 = require("./game-_utils").uuidv4;
  Vomit = require("./game-problems").Vomit;
}

class Traveller {
   constructor() {
    this.id = uuidv4();
    this.ticks = 0;
    this.completed = false;
    this.distanceFromExit = 14;
    this.isVommy = false;
    this.isPassedOut = false;
  }
  
  tick(platform) {
    if (this.distanceFromExit == 0) {
      platform.temperature -= 1;
      this.completed = true;
    }
    
    this.ticks++;
    
    if (!this.isPassedOut) {
      this.distanceFromExit--; 
    }
    
    platform.temperature += 0.1;
    
    // Am I gonna vom? 10% chance when too hot
    if (!this.isVommy && platform.temperature >= 30 && this.random() >= 0.9) { 
      platform.contents.push(new Vomit());
      this.isVommy = true;
    }
    
    // Maybe I'm going to pass out? 10% chance if the platform is rancid.
    if (!this.isPassedOut && platform.hygiene <= 30 && this.random() >= 0.9) {      
      this.isPassedOut = true;
      return;
    }
  }

  random() { return Math.random(); }
}

if (typeof(module) != 'undefined') {
  module.exports = Traveller;
}