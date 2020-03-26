const uuidv4 = require("./utils").uuidv4;
const Traveller = require("./Traveller");

class Train {
  constructor() {
    this.id = uuidv4();
    this.ticks = 0;
    this.hasTicked = false;
    this.doorState = "closed";
  }
  
  tick(platform) {
    
    platform.temperature += 0.25;

    if (this.ticks ==  0) {
      this.doorState = "opening";
    }
    if (this.ticks >  10) {
      this.doorState = "closing";
    }

    if (this.ticks > 1 && this.ticks <= 10) {
      platform.contents.push(new Traveller());
    }

    this.ticks++;
    this.hasTicked = true;    
  }

  onCompletion(platform) {
  }
}

module.exports = Train;