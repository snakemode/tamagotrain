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
    this.capacity = 100;
    this.temperature = 15;
    this.occupancy = [];
  }
}


class Game {
  constructor() {
    this.platforms = [];  
  }
  
  tick() {
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
