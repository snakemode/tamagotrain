class cleanBuff {
  constructor() {
    this.ticks = 5;
    this.completed = false;
  }
  
  tick(platform) {
    this.ticks--;
    if (this.ticks == 0) {
      this.completed = true;
    }
  }
}

class ventBuff {
  constructor() {
    this.ticks = 5;
    this.completed = false;
  }
  
  tick(platform) {
    this.ticks--;
    platform.temperature--;
    if (this.ticks == 0) {         
      this.completed = true;
    }
  }
}

class somethingBuff {
  constructor() {
    this.ticks = 5;
    this.completed = false;
  }
  
  tick(platform) {
    this.ticks--;
    if (this.ticks == 0) {
      this.completed = true;
    }
  } 
}
