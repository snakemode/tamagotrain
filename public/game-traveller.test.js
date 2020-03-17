const Traveller = require("./game-traveller");
const Platform = require("./game-platform");

describe("Traveller", () => {
    
  let traveller, platform;
  beforeEach(() => {
    traveller = new Traveller();
    platform = new Platform("platformId1");
  });
  
  it("can be constructed", () => {
    expect(traveller).toBeDefined();
    expect(traveller.id).toBeDefined();
    expect(traveller.ticks).toBe(0);
    expect(traveller.completed).toBe(false);
  });
  
  it("tick - increments tick counter", () => {
    traveller.tick(platform);    
    expect(traveller.ticks).toBe(1);
  });

});