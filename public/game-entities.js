class Traveller {
   constructor() {
    this.ticks = 0;
  }
  
  tick(platform) {
    this.ticks++;
  } 
}

if (typeof(module) != 'undefined') {
  module.exports = { Traveller }
}