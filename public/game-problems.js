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
    this.ticks = 0;
    console.log("Barf!");
  }
  
  tick(platform) {
    this.ticks++;
    this.hygiene -= 0.5;
  }  
  
}

class PassedOutTraveller extends Problem {
  constructor() {
    super();
  }
}


if (typeof(module) != 'undefined') {
  module.exports = { PlatformOccupier, Problem, Fire, Poop, Vomit }
}