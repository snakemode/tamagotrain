class GameUi {
  
  constructor(initialState) {
    this._lastState = initialState;
    
    this._renderingFunctions = [
      renderLabels,
      renderPlatform
    ];
  }
  
  getTicks() { return [...document.querySelectorAll(`[data-current-ticks]`)]; }
  
  draw(g) {
    // This is called 30 times per second
    // It's not tied to the update of the game model *at all*
    // The game ticks at it's own rate
    // We need to use this loop to render / animate things appropriately.
    
    for (let renderer of this._renderingFunctions) {
      renderer(g, this._lastState)
    }
    
    this._lastState = JSON.parse(JSON.stringify(g));
  }
}


function renderLabels(currentGameState, previousGameState) {
  
  const viewModel = {
    "game": currentGameState,
    "ticks": currentGameState.ticks,
    "total-platforms": currentGameState.platforms.length,
    "platforms": currentGameState.platforms
  };

  const props = Object.getOwnPropertyNames(viewModel);
  for (let prop of props) {
    const selector = "[data-bind-" + prop + "]";
    const elements = [...document.querySelectorAll(selector)];
    for(let ele of elements) {
      ele.innerHTML = viewModel[prop];
    }
  }
}

function renderPlatform(currentGameState, previousGameState) {
  
  for (let platform of currentGameState.platforms) {        
    const platformAsOfLastTick = previousGameState.platforms.filter(p => p.id == platform.id)[0];

    if (!platformAsOfLastTick.hasTrain && platform.hasTrain) {
      console.log("train arrived animation!");
      renderArrivingTrain();
    } 

    if (platformAsOfLastTick.hasTrain && !platform.hasTrain ) {
      console.log("train leaving animation!");
    }      
  }    
}

function renderArrivingTrain() {
  const src = "https://cdn.glitch.com/0993a1dd-56b8-4a95-8ad8-5383c9b59d24%2Ftrain.png?v=1584286890941"; // train
  const playfield = document.getElementById("playfield");
  const trainImage = document.createElement("img");
  trainImage.setAttribute("src", src);
  playfield.appendChild(trainImage);

  // play css animation to slide train in

}


if (typeof(module) != 'undefined') {
  module.exports = GameUi;
}