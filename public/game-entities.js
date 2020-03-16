/* globals uuidv4 */

class Traveller {
   constructor() {
    this.id = uuidv4();
    this.ticks = 0;
    this.completed = false;
    this.distanceFromExit = 14;
  }
  
  tick(platform) {
    if (this.distanceFromExit == 0) {
      platform.temperature -= 1;
      this.completed = true;
    }
    
    this.ticks++;
    this.distanceFromExit--;
    platform.temperature += 0.1;
  } 
}

if (typeof(module) != 'undefined') {
  module.exports = { Traveller }
}