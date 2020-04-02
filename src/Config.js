const hot = 35;
const fps = 30;
const ticksPerSecond = 1;

const cfg = {
  game: {
    ticksPerSecond: 1,
    fps: 30
  },
  entities: {
    platform: {
      startValues: {
        capacity: 60,
        temperature: 15,
        hygiene: 100
      },
      hygieneCap: 100,
      hygieneFloor: 0
    },
    traveller: {
      startValues: {
        ticksFromExit: 14
      },
      temperatureChangePerTick: 0.1,
      temperatureChangeOnCompletion: -1,
      stepSize: 15
    },
    train: {
      temperatureChangePerTick: 0.25,
      doorsCloseAtTick: 10,
      spawnPassengersFromTick: 2,
      spawnPassengersPerTick: 1
    }
  },
  failureConditions: {
    tooHot: 60,
    tooCold: -20,
    tooDirty: 0,
    platformCap: 60,
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