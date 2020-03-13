const deps = require("./script.js");

describe("Game", () => {
  
  let game;
  beforeEach(() => {
    game = new deps.Game();
  });
  
  it("can be constructed", () => {
    expect(game).toBeDefined();
  });
  
  it("tick - increments tick counter", () => {
    game.tick();    
    expect(game.ticks).toBe(1);
  });
  
  it("tick - ticks each platform", () => {
    const platform = new deps.Platform("some-id");
    game.platforms.push(platform);
    
    game.tick();
    
    expect(platform.ticks).toBe(1);
  });
  
});

describe("Platform", () => {
    
  let platform;
  beforeEach(() => {
    platform = new deps.Platform();
  });
  
  it("can be constructed", () => {
    expect(platform).toBeDefined();
  });
  
  it("tick - increments tick counter", () => {
    platform.tick();    
    expect(platform.ticks).toBe(1);
  });
  
});
