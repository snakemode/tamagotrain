const Train = require("./game-train");
const Platform = require("./game-platform");

describe("Train", () => {
    
  let train, platform;
  beforeEach(() => {
    platform = new Platform("platformId1");
    train = new Train();
  });
  
  it("can be constructed", () => {
    expect(train).toBeDefined();
  });
  
  it("tick - increments tick counter", () => {
    train.tick(platform);    
    expect(train.ticks).toBe(1);
  });  

  it("tick - increase temperature by 0.5", () => {
    platform.temperature = 10;    
    train.tick(platform);    
    expect(train.ticks).toBe(10.5);
  });  
});