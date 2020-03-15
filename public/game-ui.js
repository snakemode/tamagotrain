
class GameUi {
  
  constructor() {
    this._lastVm = {
      "ticks": 0,
      "total-platforms": 0,
      "platforms": []
    };
  }
  
  getTicks() { return [...document.querySelectorAll(`[data-current-ticks]`)]; }
  
  draw(g) { // React in 5 lines of code. I know I know, it's slow. It'll do for now.
    
    const viewModel = {
      "ticks": g.ticks,
      "total-platforms": g.platforms.length,
      "platforms": g.platforms
    };
    
    const props = Object.getOwnPropertyNames(viewModel);
    for (let prop of props) {
      const selector = "[data-bind-" + prop + "]";
      const elements = [...document.querySelectorAll(selector)];
      for(let ele of elements) {
        ele.innerHTML = viewModel[prop];
      }      
    }
    
    for (let platform of viewModel.platforms) {
      const platformAsOfLastTick = this._lastVm.platforms.filter(p => p.id == platform.id)[0] || new Platform(platform.id);
      
      console.log(`previous: ${platformAsOfLastTick.hasTrain} vs now ${platform.hasTrain}`);
      
      if (!platformAsOfLastTick.hasTrain && platform.hasTrain) {
        console.log("train arrived animation!");
        // play train arrival animation
        document.getElementById("playfield").innerHTML += "train arrival!";
      } 
      
      if (platformAsOfLastTick.hasTrain && !platform.hasTrain ) {
        console.log("train leaving animation!");
      }      
    }
    
    this._lastVm = JSON.parse(JSON.stringify(viewModel));
  }
}
