class GameUi {
  
  constructor(initialState) {
    this._lastState = JSON.stringify(initialState);
    
    this._renderingFunctions = [
      renderLabels,
      renderPlatform,
      renderBuffs,
      renderGameStatus
    ];
  }
  
  // THIS IS WHERE THE MAGIC HAPPENS  
  draw(g) {
    
    // This is called 30 times per second
    // It's not tied to the update of the game model *at all*
    // The game ticks at it's own rate
    // We need to use this loop to render / animate things appropriately.
    
    if (JSON.stringify(g) === this._lastState) {
      return; // No state has changed, do we need to re-render?
    }
    
    const lastStateSnapshot = JSON.parse(this._lastState);
    for (let renderer of this._renderingFunctions) {
      renderer(g, lastStateSnapshot)
    }
    
    this._lastState = JSON.stringify(g);
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

function renderBuffs(currentGameState, previousGameState) {
  const buffTing = document.getElementById("buffs");
  buffTing.innerHTML = "";
  
  for (let platform of currentGameState.platforms) {
    for (let buff of platform.buffs) {
      const ele = document.createElement("div");
      ele.innerHTML = buff.constructor.name[0].toUpperCase() + " " + buff.ticks;
      ele.classList.add("buff");
      ele.classList.add(constructor.name);
      buffTing.appendChild(ele);
      
    }
  }  
}

function renderGameStatus(currentGameState, previousGameState) {
  if (currentGameState.status !== "ended") return;  
  document.getElementById("game-over-message").classList.remove("hide");
}


function renderPlatform(currentGameState, previousGameState) {
  
  for (let platform of currentGameState.platforms) {        
    const platformAsOfLastTick = previousGameState.platforms.filter(p => p.id == platform.id)[0];

    if (!platformAsOfLastTick.hasTrain && platform.hasTrain) {
      renderArrivingTrain();
    } 

    if (platformAsOfLastTick.hasTrain && !platform.hasTrain ) {
      document.getElementById("active-train").remove();
    }      
  }    
}

function renderArrivingTrain() {
  const src = "https://cdn.glitch.com/0993a1dd-56b8-4a95-8ad8-5383c9b59d24%2Ftrain.png?v=1584286890941"; // train
  const playfield = document.getElementById("playfield");
  const trainImage = document.createElement("img");
  trainImage.setAttribute("id", "active-train");
  trainImage.setAttribute("src", src);
  trainImage.classList.add("train");
  trainImage.classList.add("arrival");
  playfield.appendChild(trainImage);

  // play css animation to slide train in

}

if (typeof(module) != 'undefined') {
  module.exports = GameUi;
}