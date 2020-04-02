const hot = 35;
const fps = 30;
const ticksPerSecond = 1;

const cfg = {
  failureConditions: {
    tooHot: 60,
    tooCold: -20,
    tooDirty: 0,
    platformCapacity: 60,
  },
  
}

module.exports = {
  hot, fps, ticksPerSecond
}