const uuidv4 = require("./utils").uuidv4;
const rand = require("./utils").rand;
const inTargetZone = require("./utils").inTargetZone;
const walkNaturally = require("./utils").walkNaturally;

const hot = require("./game-config").hot;
const fps = require("./game-config").fps;
const ticksPerSecond = require("./game-config").ticksPerSecond;


const StubAblyConnector = require("./AblyConnector");

const CleanBuff = require("./buffs/CleanBuff");
const VentBuff = require("./buffs/VentBuff");
const MusicBuff = require("./buffs/MusicBuff");


const Game = require("./Game");
const Platform = require("./Platform");


// problems.js


class Mouse extends Problem {
  constructor(x, y) {
    super(x, y);
    this.stepSize = 10;
    this.offscreen = { x: 600, y: 300 };
  }
    
  tick(platform) {
    
    if (!this.destination) {
      this.destination = { x: rand(0, platform.width), y: rand(0, platform.height) }; 
      // Go somewhere random
    } 
    
    if (platform.hygiene >= 80 || platform.temperature <= 0) {
      this.leave(platform); // Too clean or too cold! going away.
    }
    
    walkNaturally(this, this.destination, this.stepSize);    

    if (inTargetZone(this, this.offscreen, this.stepSize)) {
      this.completed = true; // They left!
    } else if (inTargetZone(this, this.destination, this.stepSize)) {
      this.destination = null;
    }
      
    
    this.ticks++;
  }
  
  leave(platform, speed) {
    this.stepSize = speed || this.stepSize;
    this.destination = this.offscreen;
  }

  onCompletion(platform) {
    platform.hygiene += 5;
  }
}

class Trash extends Problem {
  constructor(x, y) {
    super(x, y);
    this.spawnedMouse = false;
  }
  
  tick(platform) {   
    
    platform.hygiene -= 0.25;    
    
    // Spawn mouse if too trashy
    const random = rand(0, 10);
    if (!this.spawnedMouse && platform.hygiene <= 80 && random >= 9) {
      platform.contents.push(new Mouse(this.x, this.y));
      this.spawnedMouse = true;
    }
    
    this.ticks++;
  }  

  onCompletion(platform) {
  }
}

// train.js

class Train {
  constructor() {
    this.id = uuidv4();
    this.ticks = 0;
    this.hasTicked = false;
    this.doorState = "closed";
  }
  
  tick(platform) {
    
    platform.temperature += 0.25;

    if (this.ticks ==  0) {
      this.doorState = "opening";
    }
    if (this.ticks >  10) {
      this.doorState = "closing";
    }

    if (this.ticks > 1 && this.ticks <= 10) {
      platform.contents.push(new Traveller());
    }

    this.ticks++;
    this.hasTicked = true;    
  }

  onCompletion(platform) {
  }
}

// traveller.js

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
      return;
    }
    
    this.dancing = platform.buffs.filter(x => x.constructor.name == "MusicBuff").length > 0;
    platform.temperature += 0.1;

    if (this.dancing || this.isPassedOut) {
      return;
    }
    
    walkNaturally(this, this.selectedExit, 15);
    this.ticksFromExit--;

    const random = this.random();    
    
    // Am I gonna drop trash? 10% chance when too hot
    if (!this.droppedTrash && random >= 0.95) { 
      platform.contents.push(new Trash(this.x, this.y));
      this.droppedTrash = true;
      return;
    }
    
    // Maybe I'm going to pass out? 10% chance if the platform is rancid.
    if (!this.isPassedOut && platform.hygiene <= 30 && random >= 0.9) {      
      this.isPassedOut = true;
      return;
    }
  }

  random() { return Math.random(); }
}

// ui.js

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
      ele.setAttribute("data-ticks", buff.ticks); 
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
  
  const anyPlatformTooHot = currentGameState.platforms.filter(p => p.temperature > hot).length > 0;
  const overlay = document.getElementById("temperatureOverlay");
  if (anyPlatformTooHot) {
    overlay.classList.remove("hide");
    overlay.style.opacity = currentGameState.platforms[0].temperature - 10;
  } else {    
    overlay.classList.add("hide");
  }  
}


function renderPlatform(currentGameState, previousGameState) {
  
  for (let platform of currentGameState.platforms) {        
    const platformAsOfLastTick = previousGameState.platforms.filter(p => p.id == platform.id)[0];
    const trainImage = document.getElementById("trainSVG");

    if (!platformAsOfLastTick.hasTrain && platform.hasTrain) {      
      trainImage.classList.remove("train");
      trainImage.classList.remove("arrival");
      trainImage.classList.remove("slideOut");       
      trainImage.classList.add("train");
      trainImage.classList.add("arrival");
      this.track.appendChild(trainImage);
    } 

    if (platformAsOfLastTick.hasTrain && !platform.hasTrain ) {
      trainImage.classList.add("slideOut");
    }
  }    
}

function renderContents(currentGameState, previousGameState) {

  for (let platform of currentGameState.platforms) {
    
    const previousPlatform = previousGameState.platforms.filter(p => p.id == platform.id)[0];
    const previousContentIds = previousPlatform.contents.map(state => state.id);
    const currentContentIds = platform.contents.map(state => state.id);
    const removedItems = previousContentIds.filter(cid => currentContentIds.indexOf(cid) == -1);

    for (const removedEntityId of removedItems) {    
      document.getElementById(removedEntityId).remove();
    }

    for (let [index, entity] of platform.contents.entries()) {
     
      let gfxTarget = document.getElementById(entity.id);
      
      if (!gfxTarget) {        
        gfxTarget = document.createElement("div");
        
        gfxTarget.setAttribute('id', entity.id);
        gfxTarget.classList.add("entity");
        gfxTarget.classList.add(entity.constructor.name.toLowerCase());
        gfxTarget.classList.add(entity.constructor.name.toLowerCase() + Math.floor(Math.random() * 4));
        gfxTarget.setAttribute(`data-${entity.constructor.name.toLowerCase()}-id`, entity.id);
        
        const spawnPoint = rand(0, platform.spawnPoints.length);
        const spawnPointLocation = platform.spawnPoints[spawnPoint];
        const spawnX = spawnPointLocation.x;

        gfxTarget.style.position = "absolute";
        
        if (!entity.x) {
          entity.x = spawnX;
        }

        if (!entity.y) {
          entity.y = spawnPointLocation.y;
        }

        entity.isDisplayed = true;
        
        this.platform.appendChild(gfxTarget);
      }    

      const props = Object.getOwnPropertyNames(entity);
      for (let prop of props) {        
        gfxTarget.setAttribute("data-" + prop.toLowerCase(), entity[prop]); 
      }
      
      gfxTarget.setAttribute("data-x", entity.x);          
      gfxTarget.setAttribute("data-y", entity.y);

      gfxTarget.style.left = entity.x + "px";
      gfxTarget.style.top = entity.y + "px";
      gfxTarget.style.zIndex = 1000 + entity.y;
      gfxTarget.style.position = "absolute";

      if (entity.constructor.name == "Trash") {        
        gfxTarget.style.zIndex = 20;
      }      
    }
  }    
}

/* globals GameUi, Game, StubAblyConnector */

let game, ui;
let ably = new StubAblyConnector();

function startGame() {
  game = new Game("KINGS CROSS", [ "platformId1" ]);
  ui = new GameUi(game);  
  
  ably.onArrivalTo("KINGS CROSS", msg => game.registerEvent(game, msg));  
  game.start();  
  
  ably.fakeIncomingData('KINGS CROSS');
  
  setInterval(() => ui.draw(game), 1000 / fps);
}

console.log("heyhey");

module.exports = {
    CleanBuff,
    VentBuff,
    MusicBuff,
    Game,
    GameUi,
    Traveller,
    Platform,
    Train,
    startGame
};