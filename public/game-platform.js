/* globals Train */
if (typeof(module) != 'undefined') {
  Train = require("./game-train");
}

class Platform {
  constructor(id) {
    this.id = id;
    this.ticks = 0;
    
    this.capacity = 40;
    this.temperature = 15;
    this.hygiene = 100;
    
    this.train = null;
    this.hasTrain = false;
    this.contents = [];
    this.buffs = [];
        
    this.unprocessedMessages = [];  
    this.spawnPoints = [
      { x: 120,  y: -25 },
      { x: 350, y: -25 }  
    ];
    
    this.exits = [
      { x: 500,  y: 400 }
    ];    
  }
  
  tick() {
    this.ticks++;
    
    while (this.unprocessedMessages.length > 0) {
      const msg = this.unprocessedMessages.shift(); // FIFO
      
      if (msg.arrived) {
        this.hasTrain = true;
        this.train = new Train();
      }      
            
      if (msg.departed) {
        this.hasTrain = false;
        this.train = null;
      }      
    }
    
    let tickables = [ this.train, ...this.contents, ...this.buffs ];

    for (let item of tickables) {
      if (!item) continue;      
      if (item["tick"]) {
        item.tick(this);
      }
    }
    
    this.buffs = this.buffs.filter(b => !b.completed);
    this.contents = this.contents.filter(b => !b.completed);
    this.capacity = this.capacity <= 0 ? 0 : this.capacity;
    this.hygiene = this.hygiene <= 0 ? 0 : this.hygiene;
  }
}


if (typeof(module) != 'undefined') {
  module.exports = Platform;
}