class Problem {
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
    this.platformId = platformId;
    this.capacity = 20;
    this.temperature = 15;
    this.occupancy = [];
  }
}


class Game {
  constructor() {
    this.ticks = 0;
    this.platforms = [];  
  }
  
  start() {
    
  }
  
  tick() {
    this.tick++;
    // move any departing trains off platforms
    // move any arriving trains onto platforms
    // apply effects of problems
    // handle user input actions    
  }
  
  registerArrival() {
    // put the train into the arrival queue to shift onto a platform
  }
  
  registerDeparture() {
    // remove a train from a platform
  }
}

// Play nicely with jest.
if (typeof(module) != 'undefined') {
  module.exports = {
    Problem, 
    Fire, 
    Poop, 
    Vomit, 
    Traveller, 
    Platform, 
    Game
  }
}