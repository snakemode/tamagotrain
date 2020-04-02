const config = require("./Config");
const cfg = config.game;

const Game = require("./Game");
const GameUi = require("./GameUi");

const AblyTrainArrivalsClient = require("./AblyTrainArrivalsClient");
const SimulatedTrainArrivalsClient = require("./SimulatedTrainArrivalsClient");

let game, ui, dataSource;

async function startGame(useRealData = false) {
  dataSource = useRealData 
                ? new AblyTrainArrivalsClient() 
                : new SimulatedTrainArrivalsClient();
  
  game = new Game([ "platformId1" ]);  
  ui = new GameUi(game);
    
  await dataSource.listenForEvents("northern:940GZZLUKSX", msg => game.registerEvent(game, msg));  
  
  game.start(gameOver => {
    dataSource.stopListening();
  });
  
  setInterval(() => ui.draw(game), 1000 / cfg.fps);
  
  return game;
}

module.exports = { startGame };