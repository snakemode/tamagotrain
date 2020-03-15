class PlatformOccupier {
  constructor() {
  }
}

class Problem extends PlatformOccupier {
  constructor() {
  }
}

class Fire extends Problem {
  constructor() {
    super();
  }
}

class Poop extends Problem {
  constructor() {
    super();
  }
}

class Vomit extends Problem {
  constructor() {
    super();
  }
}

class PassedOutTraveller extends Problem {
  constructor() {
    super();
  }
}

class Traveller {
  
}

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


class Game {
  constructor(stationName, platformIds) {
    this.ticks = 0;
    this.platforms = [];
        
    for (let id of platformIds) {
      this.platforms.push(new Platform(id));
    }
  }
  
  start() {
    setInterval(() => this.tick(this), 1 * 1000);
  }
  
  tick(current) {    
    current.ticks++;
    
    for (let platform of current.platforms) {
      platform.tick();
    }
    // handle user input actions    
  }
  
  registerEvent(current, ablyMessage) {
    console.log("Register event", ablyMessage);
    const matchingPlatform = current.platforms.filter(p => p.id === ablyMessage.line)[0];
    matchingPlatform.unprocessedMessages.push(ablyMessage);
  }
}



// Play nicely with jest.
if (typeof(module) != 'undefined') {
  module.exports = {
    PlatformOccupier,
    Problem, 
    Fire, 
    Poop, 
    Vomit, 
    Traveller, 
    Platform, 
    Game
  }
}