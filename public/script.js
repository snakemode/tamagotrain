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
  constructor(platformId) {
    this.ticks = 0;
    this.platformId = platformId;
    
    this.capacity = 100;
    this.temperature = 15;
    this.hygiene = 100;
    
    this.occupancy = [];
  }
  
  tick() {
    this.ticks++;
    // move any departing trains off platforms
    // move any arriving trains onto platforms
    // apply effects of problems
  }
}


class Game {
  constructor() {
    this.ticks = 0;
    this.platforms = [];
  }
  
  start() {
    // setTimeout
  }
  
  tick() {
    this.ticks++;
    for (let platform of this.platforms) {
      platform.tick();
    }
    // handle user input actions    
  }
  
  registerArrival(trainArrivalMessage) {
    // put the train into the arrival queue to shift onto a platform
  }
  
  registerDeparture(trainDepartureMessage) {
    // remove a train from a platform
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