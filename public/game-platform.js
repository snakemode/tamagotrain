class Platform {
  constructor(id) {
    this.id = id;
    this.ticks = 0;
    
    this.capacity = 100;
    this.temperature = 15;
    this.hygiene = 100;
    
    this.occupancy = [];
    this.hasTrain = false;
    
    this.unprocessedMessages = [];
  }
  
  tick() {
    this.ticks++;
    
    while (this.unprocessedMessages.length > 0) {
      const msg = this.unprocessedMessages.shift(); // FIFO
      
      if (msg.arrived) {
        this.hasTrain = true;
        console.log(`A train just arrived on ${this.id}`);
      }
      // Process message
      // move any departing trains off platforms
      // move any arriving trains onto platforms
    }
    

    // apply effects of problems
  }
}


if (typeof(module) != 'undefined') {
  module.exports = { Platform }
}