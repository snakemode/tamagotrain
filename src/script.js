const fps = require("./Config").fps;
const Game = require("./Game");
const GameUi = require("./GameUi");

const AblyMessageRouter = require("./AblyMessageRouter");
const AblyTrainArrivalsClient = require("./AblyTrainArrivalsClient");
const SimulatedTrainArrivalsClient = require("./SimulatedTrainArrivalsClient");

let game, ui, messageRouter, dataSource;

async function startGame(useRealData = false) {
  game = new Game("KINGS CROSS", [ "platformId1" ]);
  ui = new GameUi(game);  
  
  dataSource = new SimulatedTrainArrivalsClient(); //useRealData ? new AblyTrainArrivalsClient() : new FakeTrainArrivalsData();
  
  messageRouter = new AblyMessageRouter();
  await dataSource.listenForEvents('KINGS CROSS', function() { messageRouter.onDataReceived } );  
  messageRouter.onArrivalTo("KINGS CROSS", msg => game.registerEvent(game, msg));
  
  game.start();
  setInterval(() => ui.draw(game), 1000 / fps);
  
  return game;
}

module.exports = { startGame };