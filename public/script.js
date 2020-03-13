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
  constructor(platformId) {
    this.ticks = 0;
    this.platformId = platformId;
    
    this.capacity = 100;
    this.temperature = 15;
    this.hygiene = 100;
    
    this.occupancy = [];
    
    this.unprocessedMessages = [];
  }
  
  tick() {
    this.ticks++;
    // move any departing trains off platforms
    // move any arriving trains onto platforms
    // apply effects of problems
  }
}


class Game {
  constructor(stationName, platformIds) {
    this.ticks = 0;
    this.platforms = [];
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
  
  registerEvent(ablyMessage) {
    // put the message into the unprocessedMessages queue of the right platform
    // message will be processed when the game ticks
  }
}

class GameUi {
  getTicks() { return [...document.querySelectorAll(`[data-current-ticks]`)]; }
  
  draw(g) { // React in 5 lines of code. I know I know, it's slow. It'll do for now.
    
    const viewModel = {
      "ticks": g.ticks,
      "total-platforms": g.platforms.length,
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
}

class StubAblyConnector {
  constructor() {
    
  }
  
  onArrivalTo(stationName, callback) {
    // subscribe to that line / station and wire up the callback
  }
}

const ui = new GameUi();

let game;
let ably = new StubAblyConnector();

function startGame() {
  game = new Game("KINGS CROSS", [ "platformId1", "platformId2" ]);
  ably.onArrivalTo("KINGS CROSS", game.registerEvent);  
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