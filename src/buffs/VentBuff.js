class VentBuff {
  constructor() {
    console.log("🌬 VentBuff()");
    this.ticks = 5;
    this.completed = false;
  }
  
  tick(platform) {
    this.ticks--;
    platform.temperature--;
    platform.hygiene += 0.2;
    if (this.ticks == 0) {         
      this.completed = true;
    }
  }
}

module.exports = VentBuff;