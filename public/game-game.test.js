const Game = require("./game-game");
const Platform = require("./game-platform");

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

  it("tick - triggers game over when temperature too hot", () => {
    game.platforms[0].temperature = 50;
    game.tick();
    expect(game.status).toBe("ended");
  });

  it("tick - triggers game over when temperature too cold", () => {
    game.platforms[0].temperature = -50;
    game.tick();
    expect(game.status).toBe("ended");
  });

  it("tick - triggers game over when unhygienic", () => {
    game.platforms[0].hygiene = 0;
    game.tick();
    expect(game.status).toBe("ended");
  });

  it("tick - triggers game over when platform is full", () => {
    game.platforms[0].contents.push({});
    game.platforms[0].contents.push({});
    game.platforms[0].capacity = 1;
    game.tick();
    expect(game.status).toBe("ended");
  });
  
  
});
