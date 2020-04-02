const rand = require("../utils").rand;
const uuidv4 = require("../utils").uuidv4;
const walkNaturally = require("../traits/Pathfinder").walkNaturally;
const Trash = require("../problems/Trash");


class Traveller {
   constructor() {
    this.id = uuidv4();
    this.ticks = 0;
    this.ticksFromExit = 14;

    this.completed = false;
    this.droppedTrash = false;
    this.isPassedOut = false;
    this.isDisplayed = false;
    this.dancing = false;
     
    console.log("🕺 Traveller(id=" + this.id + ")");
  }
  
  tick(platform) {
    this.ticks++;    

    if (!this.selectedExit) {
      const exitIndex = rand(0, platform.exits.length);
      this.selectedExit = platform.exits[exitIndex];
    }

    if (this.ticksFromExit == 0) {
      platform.temperature -= 1;
      this.completed = true;
      
      console.log("🚪 Traveller(id="+ this.id + ") reached exit");
      return;
    }
    
    this.dancing = platform.buffs.filter(x => x.constructor.name == "MusicBuff").length > 0;
    platform.temperature += 0.1;

    if (this.dancing || this.isPassedOut) {
      return;
    }
    
    walkNaturally(this, this.selectedExit, 15);
    this.ticksFromExit--;

    const random = rand(0, 100);
    
    // Am I gonna drop trash? 
    if (!this.droppedTrash && random <= 5) { 
      platform.contents.push(new Trash(this.x, this.y));
      this.droppedTrash = true;
      return;
    }
    
    // Maybe I'm going to pass out?
    if (!this.isPassedOut && platform.hygiene <= 30 && random <= 10) {      
      this.isPassedOut = true;
      console.log("🤒 Traveller(id="+ this.id + ") passed out.");
      return;
    }
  }

  random() { return Math.random(); }
}

module.exports = Traveller;