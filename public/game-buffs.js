class cleanBuff {
  constructor() {
    this.ticks = 5;
    this.completed = false;
  }
  
  tick(platform) {
    this.ticks--;
    
    for (let index in platform.contents) {
      const entity = platform.content[index];
      if (entity.constructor.name === "Vomit") {
        platform.contents = platform.contents.filter(item => item !== valueToRemove)
      }
    }
    
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


if (typeof(module) != 'undefined') {
  module.exports = {
    cleanBuff,
    ventBuff,
    somethingBuff
  };
}