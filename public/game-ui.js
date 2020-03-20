 class GameUi {
  
  constructor(initialState) {
    this.playfield = document.getElementById("playfield");
    this.track = document.getElementById("track");
    this.platform = document.getElementById("platform");
    
    this._lastState = JSON.stringify(initialState);    
    this._renderingFunctions = [
      renderLabels,
      renderGameStatus,
      renderTemperature,
      renderPlatform,
      renderContents,
      renderBuffs
    ];
  }
  
  draw(g) {
    if (JSON.stringify(g) === this._lastState) {
      return; // No state has changed, do we need to re-render?
    }
    
    const lastStateSnapshot = JSON.parse(this._lastState);
    for (let renderer of this._renderingFunctions) {
      const ret = renderer(g, lastStateSnapshot)
      if (ret === -1) { // Renderer caused an early exit
        break;
      }
    }
    
    this._lastState = JSON.stringify(g);
  }
}

function rand(start, end) {
  return Math.floor(Math.random() * end) + start;
}

function renderLabels(currentGameState, previousGameState) {
  
  const viewModel = {
    "game": currentGameState,
    "ticks": currentGameState.ticks,
    "total-platforms": currentGameState.platforms.length,
    "platforms": currentGameState.platforms,
    "gameovermsg": currentGameState.gameovermsg
  };

  let props = Object.getOwnPropertyNames(viewModel);
  for (let prop of props) {
    const selector = "[data-bind-" + prop + "]";
    const elements = [...document.querySelectorAll(selector)];
    for(let ele of elements) {
      ele.innerHTML = viewModel[prop];
    }
  }
    
  for (let index in currentGameState.platforms) {
    const platform = currentGameState.platforms[index];
    
    props = Object.getOwnPropertyNames(platform);
    for (let prop of props) {
      const selector = "[data-bind-platform-" + index + "-" + prop + "]";
      const elements = [...document.querySelectorAll(selector)];
      for(let ele of elements) {
        ele.innerHTML = platform[prop];
      }
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
      ele.classList.add(buff.constructor.name);
      buffTing.appendChild(ele);
      
    }
  }  
}

function renderGameStatus(currentGameState, previousGameState) {
  if (currentGameState.status !== "ended") return;  
  document.getElementById("game-over-message").classList.remove("hide");
  
  return -1;
}

function renderTemperature(currentGameState, previousGameState) {
  
  const anyPlatformTooHot = currentGameState.platforms.filter(p => p.temperature > 30).length > 0;
  const overlay = document.getElementById("temperatureOverlay");
  if (anyPlatformTooHot) {
    overlay.classList.remove("hide");
    overlay.style.opacity = currentGameState.platforms[0].temperature + "%";
  } else {    
    overlay.classList.add("hide");
  }  
}


function renderPlatform(currentGameState, previousGameState) {
  
  for (let platform of currentGameState.platforms) {        
    const platformAsOfLastTick = previousGameState.platforms.filter(p => p.id == platform.id)[0];

    if (!platformAsOfLastTick.hasTrain && platform.hasTrain) {
      const existing = document.getElementById("active-train");
      if(existing) {
        existing.remove();
      }
      renderArrivingTrain();
    } 

    if (platformAsOfLastTick.hasTrain && !platform.hasTrain ) {
      document.getElementById("active-train").classList.add("slideOut");
    }      
  }    
}

function renderContents(currentGameState, previousGameState) {
  const spawnPoints = [
    { x: 20, y: 0 },
    { x: 120, y: 0 }  
  ];
  
  this.platform.innerHTML = "";
  
  for (let platform of currentGameState.platforms) {
    
    for (let entity of platform.contents) {
     
      let gfxTarget = document.getElementById(entity.id + "-gfx");
      if(!gfxTarget) {            
        gfxTarget = document.createElement("div");    
        entityIcon.setAttribute('id', entity.id + "-gfx");
        entityIcon.classList.add("entity");
        entityIcon.classList.add(entity.constructor.name.toLowerCase());
        entityIcon.setAttribute(`data-${entity.constructor.name.toLowerCase()}-id`, entity.id);
        this.platform.appendChild(entityIcon);
      }
      
      
      entityIcon.setAttribute("data-x", entity.x);          
      entityIcon.setAttribute("data-y", entity.y);
      
    }    
   
  }    
}

function renderArrivingTrain() {
  const trainImage = document.createElement("div");
  trainImage.setAttribute("id", "active-train");
  trainImage.classList.add("train");
  trainImage.classList.add("arrival");
  this.track.appendChild(trainImage);

  // play css animation to slide train in

}

if (typeof(module) != 'undefined') {
  module.exports = GameUi;
}