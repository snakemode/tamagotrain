const config = require("./Config");
const cfg = config.game;
const Platform = require("./entities/Platform");

const CleanBuff = require("./buffs/CleanBuff");
const MusicBuff = require("./buffs/MusicBuff");
const VentBuff = require("./buffs/VentBuff");

const nothing = () => { };
const asyncNothing = async () => { };

const buffs = { 
  CleanBuff,
  MusicBuff,
  VentBuff
};

class Game {
  constructor(platformIds) {
    this.ticks = 0;
    this.status = "inactive";
    this.platforms = [];    
    this.queuedActions = [];
    this.onGameOver = nothing;

    platformIds = platformIds || [ "platformId1" ];
        
    for (let id of platformIds) {
      this.platforms.push(new Platform(id));
    }
  }
  
  async start(options) {
    const onStart = options.onGameStart || asyncNothing;
    this.onGameOver = options.onGameOver || nothing;
    this.status = "active";

    await onStart();

    this.tickInterval = setInterval(() => {
      this.tick();
    }, 1000 / cfg.ticksPerSecond);
  }

  stop() {    
    clearInterval(this.tickInterval);      
    this.status = "ended";
    this.onGameOver(this);
  }
  
  tick() {
    this.ticks++;
         
    const gameOverCheck = this.isGameOver(this);    
    if (gameOverCheck.gameover) {      
      this.gameover = gameOverCheck;
      this.gameovermsg = gameOverCheck.message;
      console.log("☠ Game ended");
      this.stop();
      return;
    }   
    
    // handle user input actions    
    while (this.queuedActions.length > 0) {
      const action = this.queuedActions.shift();
      const handlerName = action.key.charAt(0).toUpperCase() + action.key.slice(1) + "Buff";
      const target = this.platforms.filter(p => p.id == action.target)[0];      
      const handler = this.createBuff(handlerName);
      target.buffs.push(handler);
    }    
     
    for (let platform of this.platforms) {
      platform.tick();
    }
  }

  createBuff(name) {   
    try {
      return new buffs[name]();      
    } catch (ex) {
      throw "Could not find handler called " + name;
    }
  }
  
  isGameOver() {    
    const failureConditions = [
      { condition: (g) => (g.platforms.filter(p => p.temperature >= cfg.failureConditions.tooHot).length > 0), message: "It's too hot! Score: " +  this.ticks },
      { condition: (g) => (g.platforms.filter(p => p.temperature <= cfg.failureConditions.tooCold).length > 0), message: "It's too cold! Score: " +  this.ticks },
      { condition: (g) => (g.platforms.filter(p => p.hygiene <= cfg.failureConditions.tooDirty).length > 0), message: "It's too disgusting! Score: " +  this.ticks},
      { condition: (g) => (g.platforms.filter(p => p.contents.length >= p.capacity).length > 0), message: "Your platforms are too full! Score: " +  this.ticks}
    ];
    
    for (let index in failureConditions) {
      const c = failureConditions[index];
      if (c.condition(this)) {
        return { gameover: true, message: c.message, conditionId: index };
      }
    }
    
    return { gameover: false };
  }
  
  queueAction(key, target) {
    if (this.queuedActions.length >= cfg.actionQueueCap) return;
    this.queuedActions.push({ key: key, target: target })
  }
  
  registerEvent(current, ablyMessage) {
    const matchingPlatform = current.platforms.filter(p => p.id === ablyMessage.line)[0];
    matchingPlatform.unprocessedMessages.push(ablyMessage);
  }
}

module.exports = Game;