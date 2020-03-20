/* globals uuidv4, Vomit */
if (typeof(module) != 'undefined') {  
  uuidv4 = require("./game-_utils").uuidv4;
  Vomit = require("./game-problems").Vomit;
}

class Traveller {
   constructor() {
    this.id = uuidv4();
    this.ticks = 0;
    this.completed = false;
    this.distanceFromExit = 14;
    this.isVommy = false;
    this.isPassedOut = false;
    this.isDisplayed = false;
  }
  
  tick(platform) {
    if (this.distanceFromExit == 0) {
      platform.temperature -= 1;
      this.completed = true;
    }
    
    this.ticks++;
    
    if (!this.isPassedOut) {
      this.distanceFromExit--; 
    }
    
    platform.temperature += 0.1;
    
    // Am I gonna vom? 10% chance when too hot
    if (!this.isVommy && platform.temperature >= 30 && this.random() >= 0.9) { 
      platform.contents.push(new Vomit());
      this.isVommy = true;
    }
    
    // Maybe I'm going to pass out? 10% chance if the platform is rancid.
    if (!this.isPassedOut && platform.hygiene <= 30 && this.random() >= 0.9) {      
      this.isPassedOut = true;
      return;
    }
  }
  
  walkTowards(location) {
    
    this.distanceFromExit--;
    
    const unitSize = 5;
    
    if (this.isDisplayed) { // Has been rendered
      this.y += unitSize;
      
    }
    
    /*
      const stepSize = rand(1, 5);
          
      const possibleSteps = [
        { x: entity.x - stepSize, y: entity.y - stepSize },
        { x: entity.x - stepSize, y: entity.y },
        { x: entity.x - stepSize, y: entity.y + stepSize },
        { x: entity.x, y: entity.y - stepSize },
        { x: entity.x, y: entity.y + stepSize },            
        { x: entity.x + stepSize, y: entity.y - stepSize },
        { x: entity.x + stepSize, y: entity.y },
        { x: entity.x + stepSize, y: entity.y + stepSize },
      ];

      const currentManhattenDistance = manhattenDistance({x: entity.x, y: entity.y}, target);
      const closerSteps = possibleSteps.filter(s => manhattenDistance(s, target) < currentManhattenDistance);

      if (closerSteps.length > 0) {          
        const stepChoice = rand(0, closerSteps.length);          
        const selectedStep = closerSteps[stepChoice];
        entity.x = selectedStep.x;
        entity.y = selectedStep.y;
      }    
    */
  }

  random() { return Math.random(); }
}

if (typeof(module) != 'undefined') {
  module.exports = Traveller;
}