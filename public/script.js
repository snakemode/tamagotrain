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

class Platform {
  constructor() {
    this.capacity = 100;
    this.occupancy = 0;
    this.problems = []; 
  }
}

class Game {
  constructor() {
    this.platforms = [];  
  }
}
