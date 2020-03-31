const fps = require("./Config").fps;
const Game = require("./Game");
const GameUi = require("./GameUi");
const TrainMessageRouter = require("./TrainMessageRouter");

const AblyTrainArrivalsClient = require("./AblyTrainArrivalsClient");
const SimulatedTrainArrivalsClient = require("./SimulatedTrainArrivalsClient");

let game, ui, dataSource;

async function startGame(useRealData = true) {
  game = new Game("KINGS CROSS", [ "platformId1" ]);
  ui = new GameUi(game);
    
  dataSource = useRealData ? new AblyTrainArrivalsClient() : new SimulatedTrainArrivalsClient();
  await dataSource.listenForEvents('KINGS CROSS', msg => game.registerEvent(game, msg));  
  
  game.start();
  setInterval(() => ui.draw(game), 1000 / fps);
  
  return game;
}

module.exports = { startGame };