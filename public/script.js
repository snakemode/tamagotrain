/* globals GameUi, Game, StubAblyConnector */

const ui = new GameUi();

let game;
let ably = new StubAblyConnector();

function startGame() {
  game = new Game("KINGS CROSS", [ "platformId1" ]);
  ably.onArrivalTo("KINGS CROSS", msg => game.registerEvent(game, msg));  
  game.start();  
  setInterval(() => ui.draw(game), 1000 / 30);
}
