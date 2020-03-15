/* globals Train */

class Platform {
  constructor(id) {
    this.id = id;
    this.ticks = 0;
    
    this.capacity = 100;
    this.temperature = 15;
    this.hygiene = 100;
    
    this.train = null;
    this.hasTrain = false;
    this.contents = [];
    this.buffs = [];
        
    this.unprocessedMessages = [];
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
    
    const tickables = [ this.train, ...this.contents, ...this.buffs ];

    for (let item of tickables) {
      if (!item) continue;      
      if (item["tick"]) {
        item.tick(this);
      }      
    }
    
    this.buffs = this.buffs.filter(b => !b.completed);
  }
}


if (typeof(module) != 'undefined') {
  module.exports = { Platform }
}