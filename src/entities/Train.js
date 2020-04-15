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
    this.closeDoorsAtTick = cfg.doorsCloseAtTick;
    
    console.log("🚂 Train(id=" + this.id + ")");
 }
  
  setDepartureTimeInMs(departureTimeInMs) {
    const 
    this.closeDoorsAtTick = (Math.floor((departureTimeInMs / config.game.ticksPerSecond))) - 2;
    console.log("Train will close doors at Train Tick: ", this.closeDoorsAtTick);
  }
  
  tick(platform) {
    
    platform.temperature += cfg.temperatureChangePerTick;

    if (this.ticks == 0) {
      this.doorState = "opening";
    }

    if (this.ticks > this.closeDoorsAtTick) {
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