const Platform = require("./game-platform.js");

describe("Platform", () => {
    
  let platform;
  beforeEach(() => {
    platform = new Platform("platformId1");
  });
  
  it("can be constructed", () => {
    expect(platform).toBeDefined();
  });
  
  it("tick - increments tick counter", () => {
    platform.tick();    
    expect(platform.ticks).toBe(1);
  });
  
  it("tick - triggers each occupying element to act", () => {
    platform.hygiene = 100;
    platform.occupancy.push(new SomethingThatDecreasesHygieneByOne());
    
    platform.tick();    
    
    expect(platform.hygiene).toBe(99);
  });
  
});


class SomethingThatDecreasesHygieneByOne {
  onTick(platform) { 
    console.log("ontick");
    platform.hygiene--; 
  }
}
