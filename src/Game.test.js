const Game = require("./Game");
const Platform = require("./entities/Platform");

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
    game.platforms[0].temperature = 60;
    game.tick();
    expect(game.status).toBe("ended");
  });

  it("tick - triggers game over when temperature too cold", () => {
    game.platforms[0].temperature = -60;
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
  
  it("queueAction queues appropriate buff up", () => {
    game.queueAction("clean", "platformId1");
    
    game.tick();

    expect(game.platforms[0].buffs.length).toBe(1);
    expect(game.platforms[0].buffs[0].constructor.name).toBe("cleanBuff");
  });
  
  it("queueAction unknown buff, raises error", () => {
    game.queueAction("not_a_real_buff", "platformId1");
    
    expect(() => game.tick()).toThrow("Could not find handler called Not_a_real_buffBuff");
  });
  
  
});
