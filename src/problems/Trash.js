const Problem = require("./Problem");
const Mouse = require("./Mouse");
const rand = require("../utils").rand;

class Trash extends Problem {
  constructor(x, y) {
    super(x, y);
    this.spawnedMouse = false;
  }
  
  tick(platform) {   
    
    platform.hygiene -= 0.25;    
    
    // Spawn mouse if too trashy
    const random = rand(0, 10);
    if (!this.spawnedMouse && platform.hygiene <= 80 && random >= 9) {
      platform.contents.push(new Mouse(this.x, this.y));
      this.spawnedMouse = true;
    }
    
    this.ticks++;
  }  

  onCompletion(platform) {
  }
}

module.exports = Trash;