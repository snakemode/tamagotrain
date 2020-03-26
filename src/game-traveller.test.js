const Traveller = require("./game-traveller").Traveller;
const Platform = require("./game-platform").Platform;

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
    expect(traveller.isVommy).toBe(true);
  });

  it("tick - doesn't vomit 90% of the time", () => {
    platform.temperature = 30;
    traveller.random = () => 0.5;

    traveller.tick(platform); 

    expect(traveller.isVommy).toBe(false);
  });

  it("tick - doesn't vomit if they already have", () => {
    platform.temperature = 30;
    traveller.random = () => 1.0;

    traveller.tick(platform);  // voms
    traveller.tick(platform);  // doesn't vom

    expect(platform.contents.length).toBe(1); // only one vom
  });

  it("tick - passes out 10 percent of the time when hygiene is poor", () => {
    platform.hygiene = 30;
    traveller.random = () => 1.0;

    traveller.tick(platform); 

    expect(traveller.isPassedOut).toBe(true);
  });

  it("tick - doesn't pass out 90% of the time when hygiene is poor", () => {
    platform.hygiene = 30;
    traveller.random = () => 0.5;

    traveller.tick(platform); 

    expect(traveller.isPassedOut).toBe(false);
  });

});