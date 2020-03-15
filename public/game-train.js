class Train {
  constructor() {
    this.ticks = 0;
    this.hasTicked = false;
  }
  
  tick(platform) {
    this.ticks++;
    
    if(this.hasTicked) {
      return; // Only run logic once.
    }
    
    // Code that can generate problems on the platform goes here.
    platform.temperature += 5;
    
    this.hasTicked = true;
  }
}

if (typeof(module) != 'undefined') {
  module.exports = { Train }
}