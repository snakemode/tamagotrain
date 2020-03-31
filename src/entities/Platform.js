const Train = require("./Train");

class Platform {
  constructor(id) {
    this.id = id;
    this.ticks = 0;
    this.width = 500;
    this.height = 200;
    
    this.capacity = 60;
    this.temperature = 15;
    this.hygiene = 100;
    
    this.train = null;
    this.hasTrain = false;
    this.contents = [];
    this.buffs = [];
        
    this.unprocessedMessages = [];  
    this.spawnPoints = [
      { x: 120, y: -25, give: 5 },
      { x: 350, y: -25, give: 5 }  
    ];
    
    this.exits = [
      { x: 0,  y: 180 },
      // { x: 500,  y: 200 }
    ];    
  }
  
  tick() {
    this.ticks++;

    while (this.unprocessedMessages.length > 0) {
      const msg = this.unprocessedMessages.shift(); // FIFO
      
      console.log("Message:", msg);
      
      if (msg.arrived) {
        this.hasTrain = true;
        this.train = new Train();        
      }
            
      if (msg.departed) {   
        this.train.completed = true;
        this.complete(this.train);
        this.hasTrain = false;
        this.train = null;        
        console.log("Removed train");
      }      
    }
    
    let tickables = [ this.train, ...this.contents, ...this.buffs ];

    //console.log("Ticking:", tickables);
    console.log("Ticking " + tickables.length + " items.");
    
    for (let item of tickables) {
      if (!item) continue;      
      if (item["tick"]) {
        item.tick(this);
      }
            
      this.complete(item);
    }
    
    this.buffs = this.buffs.filter(b => !b.completed);
    this.contents = this.contents.filter(b => !b.completed);
    this.capacity = this.capacity <= 0 ? 0 : this.capacity;
    this.hygiene = this.hygiene <= 0 ? 0 : this.hygiene;
    this.hygiene = this.hygiene > 100 ? 100 : this.hygiene;
  }
  
  complete(i) {
    if(!i.completed) {
      return;
    }
    
    console.log("Completed", i);    
    if (i["onCompletion"]) {       
      i.onCompletion(this);
    } 
  }
}

module.exports = Platform;