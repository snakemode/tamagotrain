class CleanBuff {
  constructor() {
    console.log("Creating CleanBuff 🧼🧼🧼");
    this.ticks = 5;
    this.completed = false;
    this.hasTicked = false;
  }
  
  tick(platform) {
    this.ticks--;    
    platform.hygiene += 2.5;
    
    this.removeOneTrash(platform);
    
    if (this.ticks == 0) {
      this.completed = true;
    }
    
    this.hasTicked = true;
  }
  
  removeOneTrash(platform) {
    for (let index in platform.contents) {
      const entity = platform.contents[index];
      if (entity.constructor.name === "Trash") {
        platform.contents = platform.contents.filter(item => item !== entity);
        
        console.log("Removed an item of trash 🚮");
        return;
      }
    }    
  }
}

module.exports = CleanBuff;