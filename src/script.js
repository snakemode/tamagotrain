const fps = require("./Config").fps;
const Game = require("./Game");
const GameUi = require("./GameUi");
const TrainMessageRouter = require("./TrainMessageRouter");

const AblyTrainArrivalsClient = require("./AblyTrainArrivalsClient");
const SimulatedTrainArrivalsClient = require("./SimulatedTrainArrivalsClient");

let game, ui, messageRouter, dataSource;

async function startGame(useRealData = false) {
  game = new Game("KINGS CROSS", [ "platformId1" ]);
  ui = new GameUi(game);
  
  messageRouter = new TrainMessageRouter();  
  messageRouter.onArrivalTo("KINGS CROSS", msg => game.registerEvent(game, msg));
  
  dataSource = useRealData ? new AblyTrainArrivalsClient() : new SimulatedTrainArrivalsClient();
  await dataSource.listenForEvents('KINGS CROSS', msg =>  messageRouter.onDataReceived(msg));  
  
  game.start();
  setInterval(() => ui.draw(game), 1000 / fps);
  
  return game;
}

module.exports = { startGame };