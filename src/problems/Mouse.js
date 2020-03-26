const Problem = require("./Problem");
const rand = require("../utils").rand;
const inTargetZone = require("../traits/Pathfinder").inTargetZone;
const walkNaturally = require("../traits/Pathfinder").walkNaturally;

class Mouse extends Problem {
  constructor(x, y) {
    super(x, y);
    this.stepSize = 10;
    this.offscreen = { x: 600, y: 300 };
  }
    
  tick(platform) {
    
    if (!this.destination) {
      this.destination = { x: rand(0, platform.width), y: rand(0, platform.height) }; 
      // Go somewhere random
    } 
    
    if (platform.hygiene >= 80 || platform.temperature <= 0) {
      this.leave(platform); // Too clean or too cold! going away.
    }
    
    walkNaturally(this, this.destination, this.stepSize);    

    if (inTargetZone(this, this.offscreen, this.stepSize)) {
      this.completed = true; // They left!
    } else if (inTargetZone(this, this.destination, this.stepSize)) {
      this.destination = null;
    }
      
    
    this.ticks++;
  }
  
  leave(platform, speed) {
    this.stepSize = speed || this.stepSize;
    this.destination = this.offscreen;
  }

  onCompletion(platform) {
    platform.hygiene += 5;
  }
}

module.exports = Mouse