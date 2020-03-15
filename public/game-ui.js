/* globals Platform */

function renderPlatform(currentGameState, previousGameState) {
  
  for (let platform of currentGameState.platforms) {        
    const platformAsOfLastTick = previousGameState.platforms.filter(p => p.id == platform.id)[0];

    if (!platformAsOfLastTick.hasTrain && platform.hasTrain) {
      console.log("train arrived animation!");
    } 

    if (platformAsOfLastTick.hasTrain && !platform.hasTrain ) {
      console.log("train leaving animation!");
    }      
  }    
}


class GameUi {
  
  constructor(initialState) {
    this._lastState = initialState;
    this._renderingFunctions = [
      renderPlatform
    ];
  }
  
  getTicks() { return [...document.querySelectorAll(`[data-current-ticks]`)]; }
  
  draw(g) { // React in 5 lines of code. I know I know, it's slow. It'll do for now.
    
    const viewModel = {
      "game": g,
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
    
    for (let renderer of this._renderingFunctions) {
      renderer(g, this._lastState)
    }    
    
    this._lastState = JSON.parse(JSON.stringify(g));
  }
}



if (typeof(module) != 'undefined') {
  module.exports = GameUi;
}