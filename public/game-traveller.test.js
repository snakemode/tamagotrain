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

  it("tick - reduces distance from exit by one", () => {
    traveller.distanceFromExit = 100;
    traveller.tick(platform);    
    expect(traveller.distanceFromExit).toBe(99);
  });

  it("tick - doesn't get closer to the exit when passed out", () => {
    traveller.distanceFromExit = 100;
    traveller.isPassedOut = true;

    traveller.tick(platform);    
    expect(traveller.distanceFromExit).toBe(100);
  });

  it("tick - vomits 10 percent of the time when temp >= 30 and hasn't already vommed", () => {
    platform.temperature = 30;
    traveller.isVommy = false;
    traveller.random = () => 1.0;

    traveller.tick(platform); 

    expect(platform.contents[0].constructor.name).toBe("Vomit");
  });

});