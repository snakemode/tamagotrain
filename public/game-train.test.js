const Train = require("./game-train").Train;
const Platform = require("./game-platform").Platform;

describe("Train", () => {
    
  let train, platform;
  beforeEach(() => {
    platform = new Platform("platformId1");
    train = new Train();
  });
  
  it("can be constructed", () => {
    expect(train).toBeDefined();
    expect(train.id).toBeDefined();
    expect(train.hasTicked).toBe(false);
    expect(train.ticks).toBe(0);
  });
  
  it("tick - increments tick counter", () => {
    train.tick(platform);    
    expect(train.ticks).toBe(1);
  });  

  it("tick - increase temperature by 0.5", () => {
    platform.temperature = 10;    
    train.tick(platform);    
    expect(platform.temperature).toBe(10.5);
  });  

  it("tick - adds a new traveller to the platform", () => {       
    train.tick(platform);  

    expect(platform.contents.length).toBe(1);
    expect(platform.contents[0].constructor.name).toBe("Traveller");
  }); 

});