const fps = require("./Config").fps;
const Game = require("./Game");
const GameUi = require("./GameUi");

const FakeTrainArrivalsData = require("./AblyConnector");
const AblyTrainArrivalsClient = require("./AblyTrainArrivalsClient");

let game, ui;
let dataSource;

function startGame(useRealData = false) {
  dataSource = useRealData ? new AblyTrainArrivalsClient() : new FakeTrainArrivalsData();
  
  game = new Game("KINGS CROSS", [ "platformId1" ]);
  ui = new GameUi(game);  
  
  dataSource.onArrivalTo("KINGS CROSS", msg => game.registerEvent(game, msg));  
  game.start();  
  
  dataSource.fakeIncomingData('KINGS CROSS');
  
  setInterval(() => ui.draw(game), 1000 / fps);
  
  return game;
}

module.exports = { startGame };