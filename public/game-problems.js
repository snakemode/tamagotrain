/* globals uuidv4 */

class Problem {
  constructor() {
    this.id = uuidv4();
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
    platform.hygiene -= 0.5;
  }  
  
}

class PassedOutTraveller extends Problem {
  constructor() {
    super();
  }
}


if (typeof(module) != 'undefined') {
  module.exports = { Problem, Fire, Poop, Vomit }
}