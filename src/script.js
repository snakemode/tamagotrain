const fps = require("./Config").fps;
const StubAblyConnector = require("./AblyConnector");
const Game = require("./Game");
const GameUi = require("./GameUi");

let game, ui;
let ably = new StubAblyConnector();

function startGame() {
  game = new Game("KINGS CROSS", [ "platformId1" ]);
  ui = new GameUi(game);  
  
  ably.onArrivalTo("KINGS CROSS", msg => game.registerEvent(game, msg));  
  game.start();  
  
  ably.fakeIncomingData('KINGS CROSS');
  
  setInterval(() => ui.draw(game), 1000 / fps);
  
  return game;
}

module.exports = { startGame };