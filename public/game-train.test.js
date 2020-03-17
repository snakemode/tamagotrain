const Train = require("./game-train.js");

describe("Train", () => {
    
  let train, platform;
  beforeEach(() => {
    platform = new platform("platformId1");
    train = new Train();
  });
  
  it("can be constructed", () => {
    expect(train).toBeDefined();
  });
  
  it("tick - increments tick counter", () => {
    train.tick(platform);    
    expect(train.ticks).toBe(1);
  });  
});