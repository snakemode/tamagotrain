const hot = 35;
const fps = 30;
const ticksPerSecond = 1;

const cfg = {
  game: {
    ticksPerSecond: 1,
    fps: 30
  },
  failureConditions: {
    tooHot: 60,
    tooCold: -20,
    tooDirty: 0,
    platformCapacity: 60,
  },
  problems: {
    mouse: {
      stepSize: 10,
      hygieneChangeWhenMouseLeaves: 5
    },
    trash: {
      hygieneChangePerTick: -0.25,
      chanceOfMouseWhenLessThanHygiene: 80,
      chanceOfMousePercent: 10
    },
    heat: {
      heatOverlayDisplaysAt: 35
    }
  }
}

module.exports = {
  hot, fps, ticksPerSecond
}