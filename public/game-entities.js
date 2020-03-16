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
      this.completed = true;
    }
    
    this.ticks++;
    this.distanceFromExit--;
  } 
}

if (typeof(module) != 'undefined') {
  module.exports = { Traveller }
}