/* globals GameUi, Game, StubAblyConnector */

let game, ui;
let ably = new StubAblyConnector();

function startGame() {
  game = new Game("KINGS CROSS", [ "platformId1" ]);
  ui = new GameUi(game);  
  
  ably.onArrivalTo("KINGS CROSS", msg => game.registerEvent(game, msg));  
  game.start();  
  
  setInterval(() => ui.draw(game), 1000 / 30);
}
