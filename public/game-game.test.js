const Game = require("./game-game.js");
const Platform = require("./game-platform.js");

describe("Game", () => {
  
  let game;
  beforeEach(() => {
    game = new Game("KINGS CROSS", [ "platformId1" ]);
  });
  
  it("can be constructed", () => {
    expect(game).toBeDefined();
  });
  
  it("tick - increments tick counter", () => {
    game.tick();    
    expect(game.ticks).toBe(1);
  });
  
  it("tick - ticks each platform", () => {
    const platform = new Platform("some-id");
    game.platforms.push(platform);
    
    game.tick();
    
    expect(platform.ticks).toBe(1);
  });
  
});
