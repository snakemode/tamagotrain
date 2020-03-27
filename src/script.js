const fps = require("./Config").fps;
const StubAblyConnector = require("./AblyConnector");
const Game = require("./Game");
const GameUi = require("./GameUi");

const ably = require('ably');

let game, ui;
let ablyConnector;

function startGame(ablyTokenRequest) {
  const client = new ably.Realtime({ authUrl: '/api/createTokenRequest' });
  
  
  ablyConnector = new StubAblyConnector();
  
  game = new Game("KINGS CROSS", [ "platformId1" ]);
  ui = new GameUi(game);  
  
  ablyConnector.onArrivalTo("KINGS CROSS", msg => game.registerEvent(game, msg));  
  game.start();  
  
  ablyConnector.fakeIncomingData('KINGS CROSS');
  
  setInterval(() => ui.draw(game), 1000 / fps);
  
  return game;
}

module.exports = { startGame };