const config = require("../Config");
const cfg = config.entities.train;
const uuidv4 = require("../utils").uuidv4;
const Traveller = require("./Traveller");

class Train {
  constructor() {
    this.id = uuidv4();
    this.ticks = 0;
    this.hasTicked = false;
    this.doorState = "closed";
    
    console.log("🚂 Train(id=" + this.id + ")");
 }
  
  tick(platform) {
    
    platform.temperature += cfg.temperatureChangePerTick;

    if (this.ticks ==  0) {
      this.doorState = "opening";
    }
    if (this.ticks > cfg.doorsCloseAtTick) {
      this.doorState = "closing";
    }

    if (this.ticks >= cfg.spawnPassengersFromTick && this.ticks <= cfg.doorsCloseAtTick) {
      for (let i = 0; i < cfg.spawnPassengersPerTick; i++) {
        platform.contents.push(new Traveller());
      }
    }

    this.ticks++;
    this.hasTicked = true;    
  }

  onCompletion(platform) {
  }
}

module.exports = Train;