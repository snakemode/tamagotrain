const ably = require('ably');

class SimulatedTrainArrivalsClient {
  constructor() {
    console.log("SimulatedTrainArrivalsClient created.");
  }

  async listenForEvents(stationName, callback) {    
    // Train arrives and departs every 2 seconds.
    const interval = 1000 * 12;

    callback({ station: stationName, line: "platformId1", arrived: true });
    setTimeout(() => { 
      callback({ station: stationName, line: "platformId1", departed: true }); 
    }, interval);  
  }
  
}

module.exports = SimulatedTrainArrivalsClient;