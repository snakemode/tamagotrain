// game-_utils.js

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function rand(start, end) {
  const result = Math.floor(Math.random() * end) + start;
  // console.log(`rand(${start},${end}) = ${result}`);
  return result;
}

function inTargetZone(location, target, tolerance) { 
  if (location.x < target.x - tolerance) return false;
  if (location.x > target.x + tolerance) return false;
  if (location.y < target.y - tolerance) return false;
  if (location.y > target.y + tolerance) return false;  
  return true;
}

function walkNaturally(walker, target, unitSize) {
  const manhattenDistance = (p1, p2) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);

  if (walker.isDisplayed) { // Has been rendered

    const stepSize = 1 * unitSize;

    const possibleSteps = [
      { x: walker.x - stepSize, y: walker.y - stepSize },
      { x: walker.x - stepSize, y: walker.y },
      { x: walker.x - stepSize, y: walker.y + stepSize },
      { x: walker.x, y: walker.y - stepSize },
      { x: walker.x, y: walker.y + stepSize },            
      { x: walker.x + stepSize, y: walker.y - stepSize },
      { x: walker.x + stepSize, y: walker.y },
      { x: walker.x + stepSize, y: walker.y + stepSize },
    ];

    const currentManhattenDistance = manhattenDistance({x: walker.x, y: walker.y}, target);
    const closerSteps = possibleSteps.filter(s => manhattenDistance(s, target) < currentManhattenDistance);
    
    if (closerSteps.length > 0) {
      const stepChoice = rand(0, closerSteps.length);          
      const selectedStep = closerSteps[stepChoice];
      walker.x = selectedStep.x;
      walker.y = selectedStep.y;
    }
  }
}

// consts

const hot = 35;
const fps = 30;
const ticksPerSecond = 1;

// ably-connector.js

class StubAblyConnector {
  constructor() {
    this.callbacks = {};
  }
  
  hasCallbacksFor(stationName) {
    const stationCallbacks = Object.getOwnPropertyNames(this.callbacks);    
    if (stationCallbacks.indexOf(stationName) == -1) {
      return false;
    }
    return true;
  }
  
  onArrivalTo(stationName, callback) {    
    if(!this.hasCallbacksFor(stationName)) {
      this.callbacks[stationName] = [];
    }
    
    this.callbacks[stationName].push(callback);
  }
  
  fakeTrainArrival(stationName) {
    if (this.callbacks[stationName])
    
    for (let cb of this.callbacks[stationName]) {
      cb({ station: stationName, line: "platformId1", arrived: true });
    }
  }  
  
  fakeTrainDeparture(stationName) {
    if (this.callbacks[stationName])
    
    for (let cb of this.callbacks[stationName]) {
      cb({ station: stationName, line: "platformId1", departed: true });
    }
  }
  
  
  fakeIncomingData(stationName) {
    // Train arrives and departs every 2 seconds.
    const interval = 1000 * 12;    
    
    for (let cb of this.callbacks[stationName]) {
      
      cb({ station: stationName, line: "platformId1", arrived: true });
      setTimeout(() => {
        cb({ station: stationName, line: "platformId1", departed: true });
        setTimeout(() => this.fakeIncomingData(stationName), interval);
      }, interval);
      
    }    
  }
  
}

// game-buffs.js

class CleanBuff {
  constructor() {
    this.ticks = 5;
    this.completed = false;
    this.hasTicked = false;
  }
  
  tick(platform) {
    this.ticks--;    
    platform.hygiene += 1;
    
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
        return;
      }
    }    
  }
}

class VentBuff {
  constructor() {
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

class SomethingBuff {
  constructor() {
    this.ticks = 5;
    this.completed = false;
  }
  
  tick(platform) {
    this.ticks--;
    if (this.ticks == 0) {
      this.completed = true;
    }
  } 
}

// game.js


class Game {
  constructor(stationName, platformIds) {
    this.ticks = 0;
    this.status = "inactive";
    this.platforms = [];
    this.possibleActions = [
      "clean", "vent", "something"
    ];
    
    this.queuedActions = [];
        
    for (let id of platformIds) {
      this.platforms.push(new Platform(id));
    }
  }
  
  start() {
    this.tickInterval = setInterval(() => {
      this.tick();
    }, 1000 / ticksPerSecond);
    this.status = "active";
  }
  
  tick() {
    this.ticks++;
         
    const gameOverCheck = this.isGameOver(this);
    if (gameOverCheck.gameover) {
      this.endGame(gameOverCheck.message);
      return;
    }   
    
    // handle user input actions    
    while (this.queuedActions.length > 0) {
      const action = this.queuedActions.shift();
      const handlerName = action.key.charAt(0).toUpperCase() + action.key.slice(1) + "Buff";
      const target = this.platforms.filter(p => p.id == action.target)[0];      
      const handler = this.createBuff(handlerName);
      target.buffs.push(handler);
    }    
     
    for (let platform of this.platforms) {
      platform.tick();
    }
  }

  createBuff(name) {   
    try { 
      if (typeof(Buffs) !== "undefined") {
        return new Buffs[name]();
      } else {
        return (Function('return new ' + name))();
      }
    } catch (ex) {
      throw "Could not find handler called " + name;
    }
  }
  
  isGameOver() {    
    const failureConditions = [
      { condition: (g) => (g.platforms.filter(p => p.temperature >= 60).length > 0), message: "It's too hot!" },
      { condition: (g) => (g.platforms.filter(p => p.temperature <= -20).length > 0), message: "It's too cold!" },
      { condition: (g) => (g.platforms.filter(p => p.hygiene <= 0).length > 0), message: "It's too disgusting!" },
      { condition: (g) => (g.platforms.filter(p => p.contents.length >= p.capacity).length > 0), message: "Your platforms are too full!" }
    ];
    
    for (let c of failureConditions) {
      if (c.condition(this)) {
        return { gameover: true, message: c.message };
      }
    }
    
    return { gameover: false };
  }
  
  endGame(message) {
    this.status = "ended";
    this.gameovermsg = message;
    clearInterval(this.tickInterval);    
  }
  
  queueAction(key, target) {
    if (this.queuedActions.length >= 3) return; // Rate limit actions to 3 per tick.  
    this.queuedActions.push({ key: key, target: target })
  }
  
  registerEvent(current, ablyMessage) {
    const matchingPlatform = current.platforms.filter(p => p.id === ablyMessage.line)[0];
    matchingPlatform.unprocessedMessages.push(ablyMessage);
  }
}

// platform.js

class Platform {
  constructor(id) {
    this.id = id;
    this.ticks = 0;
    this.width = 500;
    this.height = 200;
    
    this.capacity = 60;
    this.temperature = 15;
    this.hygiene = 100;
    
    this.train = null;
    this.hasTrain = false;
    this.contents = [];
    this.buffs = [];
        
    this.unprocessedMessages = [];  
    this.spawnPoints = [
      { x: 120, y: -25, give: 5 },
      { x: 350, y: -25, give: 5 }  
    ];
    
    this.exits = [
      { x: 0,  y: 180 },
      // { x: 500,  y: 200 }
    ];    
  }
  
  tick() {
    this.ticks++;
    
    while (this.unprocessedMessages.length > 0) {
      const msg = this.unprocessedMessages.shift(); // FIFO
      
      if (msg.arrived) {
        this.hasTrain = true;
        this.train = new Train();
      }
            
      if (msg.departed) {
        this.train.onCompletion();
        this.hasTrain = false;
        this.train = null;
      }      
    }
    
    let tickables = [ this.train, ...this.contents, ...this.buffs ];

    for (let item of tickables) {
      if (!item) continue;      
      if (item["tick"]) {
        item.tick(this);
      }
            
      if (item.completed && item["onCompletion"]) {
        item.onCompletion(this);
      }
    }
        
    this.buffs = this.buffs.filter(b => !b.completed);
    this.contents = this.contents.filter(b => !b.completed);
    this.capacity = this.capacity <= 0 ? 0 : this.capacity;
    this.hygiene = this.hygiene <= 0 ? 0 : this.hygiene;
  }
}


// problems.js


class Problem {
  constructor(x, y) {
    this.id = uuidv4();
    this.ticks = 0;
    this.x = x;
    this.y = y;    
  }
}

class Fire extends Problem {
  constructor(x, y) {
    super(x, y);
  } 
  
  tick(platform) {  
    platform.temperature += 1;
    this.ticks++;
  }

  onCompletion(platform) {
  } 
}

class Mouse extends Problem {
  constructor(x, y) {
    super(x, y);
    this.stepSize = 10;
  }
    
  tick(platform) {
    
    if (!this.destination) {
      // Go somewhere random
      this.destination = { x: rand(0, platform.width), y: rand(0, platform.height) };
    } 
    
    if (platform.hygiene >= 80 || platform.temperature <= 0) {
      // Too clean or too cold! going away.
      this.destination = { x: platform.width + 100, y: platform.height + 100 };
    }
    
    if (this.destination) {
      walkNaturally(this, this.destination, this.stepSize);    
      
      if (inTargetZone(this, this.destination)) {
        this.destination = null;
      }
      
      if (this.x >= platform.width && this.y >= platform.height) {
        this.completed = true; // They left!
      }
    }    
    
    this.ticks++;
  }  

  onCompletion(platform) {
  }
}

class Trash extends Problem {
  constructor(x, y) {
    super(x, y);
    this.spawnedMouse = false;
  }
  
  tick(platform) {   
    
    if (this.ticks == 0) {
      platform.hygiene -= 5; 
    }
    
    // Spawn rats if too trashy
    const random = rand(0, 10);
    if (!this.spawnedMouse && platform.hygiene <= 80 && random >= 7) {
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

function walkNaturally(walker, target, unitSize) {
  const manhattenDistance = (p1, p2) => Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y);

  if (walker.isDisplayed) { // Has been rendered

    const stepSize = 1 * unitSize;

    const possibleSteps = [
      { x: walker.x - stepSize, y: walker.y - stepSize },
      { x: walker.x - stepSize, y: walker.y },
      { x: walker.x - stepSize, y: walker.y + stepSize },
      { x: walker.x, y: walker.y - stepSize },
      { x: walker.x, y: walker.y + stepSize },            
      { x: walker.x + stepSize, y: walker.y - stepSize },
      { x: walker.x + stepSize, y: walker.y },
      { x: walker.x + stepSize, y: walker.y + stepSize },
    ];

    const currentManhattenDistance = manhattenDistance({x: walker.x, y: walker.y}, target);
    const closerSteps = possibleSteps.filter(s => manhattenDistance(s, target) < currentManhattenDistance);
    
    if (closerSteps.length > 0) {
      const stepChoice = rand(0, closerSteps.length);          
      const selectedStep = closerSteps[stepChoice];
      walker.x = selectedStep.x;
      walker.y = selectedStep.y;
    }
  }
}

class Traveller {
   constructor() {
    this.id = uuidv4();
    this.ticks = 0;
    this.ticksFromExit = 14;

    this.completed = false;
    this.droppedTrash = false;
    this.isPassedOut = false;
    this.isDisplayed = false;
  }
  
  tick(platform) {

    if (!this.selectedExit) {
      const exitIndex = rand(0, platform.exits.length);
      this.selectedExit = platform.exits[exitIndex];
    }

    if (this.ticksFromExit == 0) {
      platform.temperature -= 1;
      this.completed = true;
    }
    
    this.ticks++;
    
    if (!this.isPassedOut) {
      this.ticksFromExit--;
      walkNaturally(this, this.selectedExit, 15);
    }
    
    platform.temperature += 0.1;
    
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

// Jest
if (typeof(module) != 'undefined') {
  module.exports = {
    cleanBuff,
    ventBuff,
    somethingBuff,
    Game,
    GameUI,
    Traveller,
    Platform,
    Train
  };
} else {
  startGame();
}