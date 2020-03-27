const fps = require("./Config").fps;
const Game = require("./Game");
const GameUi = require("./GameUi");

const AblyMessageRouter = require("./AblyMessageRouter");
const AblyTrainArrivalsClient = require("./AblyTrainArrivalsClient");

let game, ui;
let messageRouter;

function startGame(useRealData = false) {
  messageRouter = new AblyMessageRouter(); //useRealData ? new AblyTrainArrivalsClient() : new FakeTrainArrivalsData();
  
  game = new Game("KINGS CROSS", [ "platformId1" ]);
  ui = new GameUi(game);  
  
  messageRouter.onArrivalTo("KINGS CROSS", msg => game.registerEvent(game, msg));  
  game.start();  
  
  fakeIncomingData(messageRouter, 'KINGS CROSS');
  
  setInterval(() => ui.draw(game), 1000 / fps);
  
  return game;
}


function fakeIncomingData(messageRouter, stationName) {
  // Train arrives and departs every 2 seconds.
  const interval = 1000 * 12;    
  messageRouter.onDataReceived({ station: stationName, line: "platformId1", arrived: true });
  setTimeout(() => { messageRouter.onDataReceived({ station: stationName, line: "platformId1", departed: true }); }, interval);      
}

module.exports = { startGame };