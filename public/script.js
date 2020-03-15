class PlatformOccupier {
  constructor() {
  }
}

class Problem extends PlatformOccupier {
  constructor() {
  }
}

class Fire extends Problem {
  constructor() {
    super();
  }
}

class Poop extends Problem {
  constructor() {
    super();
  }
}

class Vomit extends Problem {
  constructor() {
    super();
  }
}

class PassedOutTraveller extends Problem {
  constructor() {
    super();
  }
}

class Traveller {
  
}

class Platform {
  constructor(id) {
    this.id = id;
    this.ticks = 0;
    
    this.capacity = 100;
    this.temperature = 15;
    this.hygiene = 100;
    
    this.occupancy = [];
    this.hasTrain = false;
    
    this.unprocessedMessages = [];
  }
  
  tick() {
    this.ticks++;
    
    while (this.unprocessedMessages.length > 0) {
      const msg = this.unprocessedMessages.shift(); // FIFO
      console.log(msg);
      
      if (msg.arrived) {
        this.hasTrain = true;
      }
      // Process message
      // move any departing trains off platforms
      // move any arriving trains onto platforms
    }
    

    // apply effects of problems
  }
}


class Game {
  constructor(stationName, platformIds) {
    this.ticks = 0;
    this.platforms = [];
        
    for (let id of platformIds) {
      this.platforms.push(new Platform(id));
    }
  }
  
  start() {
    setInterval(() => this.tick(this), 1 * 1000);
  }
  
  tick(current) {    
    current.ticks++;
    
    for (let platform of current.platforms) {
      platform.tick();
    }
    // handle user input actions    
  }
  
  registerEvent(current, ablyMessage) {
    console.log("Register event", ablyMessage);
    const matchingPlatform = current.platforms.filter(p => p.id === ablyMessage.line)[0];
    matchingPlatform.unprocessedMessages.push(ablyMessage);
  }
}

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
    
    for (let platform in viewModel.platforms) {
      const platformAsOfLastTick = this._lastVm.platforms.filter(p => p.id == platform.id)[0] || new Platform("NULL");
      
      if (platform.hasTrain && !platformAsOfLastTick.hasTrain) {
        // play train arrival animation
        document.getElementById("playfield").innerHTML += "train arrival!";
      }
      
      if (!platform.hasTrain && platformAsOfLastTick.hasTrain) {
        // play train leaving animation
      }
      
    }
    
    this._lastVm = viewModel;
  }
}

class StubAblyConnector {
  constructor() {
    this.callbacks = {};
  }
  
  onArrivalTo(stationName, callback) {
    const stationCallbacks = Object.getOwnPropertyNames(this.callbacks);
    
    if(stationCallbacks.indexOf(stationName) == -1) {
      this.callbacks[stationName] = [];
    }
    
    this.callbacks[stationName].push(callback);
  }
  
  fakeTrainArrival(stationName) {
    for (let cb of this.callbacks[stationName]) {
      cb({ station: stationName, line: "platformId1", arrived: true });
    }
  }
}

const ui = new GameUi();

let game;
let ably = new StubAblyConnector();

function startGame() {
  game = new Game("KINGS CROSS", [ "platformId1" ]);
  ably.onArrivalTo("KINGS CROSS", msg => game.registerEvent(game, msg));  
  game.start();  
  setInterval(() => ui.draw(game), 1000 / 30);
}


// Play nicely with jest.
if (typeof(module) != 'undefined') {
  module.exports = {
    PlatformOccupier,
    Problem, 
    Fire, 
    Poop, 
    Vomit, 
    Traveller, 
    Platform, 
    Game
  }
}