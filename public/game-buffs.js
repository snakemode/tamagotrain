class cleanBuff {
  constructor() {
    this.ticks = 0;
    this.completed = false;
  }
  
  tick(platform) {
    this.completed = true;
  }
}

class ventBuff {
  constructor() {
    this.ticks = 0;
    this.completed = false;
  }
  
  tick(platform) {
    this.completed = true;
  }
}

class somethingBuff {
  constructor() {
    this.ticks = 0;
    this.completed = false;
  }
  
  tick(platform) {
    this.completed = true;
  } 
}
