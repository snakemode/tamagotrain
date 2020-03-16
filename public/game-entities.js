/* globals uuidv4, Vomit */

class Traveller {
   constructor() {
    this.id = uuidv4();
    this.ticks = 0;
    this.completed = false;
    this.distanceFromExit = 14;
    this.isVommy = false;
  }
  
  tick(platform) {
    if (this.distanceFromExit == 0) {
      platform.temperature -= 1;
      this.completed = true;
    }
    
    this.ticks++;
    this.distanceFromExit--;
    
    platform.temperature += 0.1;
    
    // Am I gonna vom? 10% chance when too hot
    if (!this.isVommy && platform.temperature >= 30 && Math.random() >= 0.9) { 
      platform.contents.push(new Vomit());
      this.isVommy = true;
    }
    
  } 
}

if (typeof(module) != 'undefined') {
  module.exports = { Traveller }
}