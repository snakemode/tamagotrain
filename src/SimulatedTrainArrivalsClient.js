const ably = require('ably');

class SimulatedTrainArrivalsClient {
  constructor() {
    console.log("SimulatedTrainArrivalsClient created.");
  }

  async listenForEvents(stationName, callback) {
    this._callback = callback;
    this.simulateSingleTrain();    
  }
  
  simulateSingleTrain() {
    const interval = 1000 * 12;
    
    console.log("Faking train arrival.");
    this._callback({ line: "platformId1", arrived: true });
    
    setTimeout(() => { 
      
      console.log("Faking train departure.");
      this._callback({ line: "platformId1", departed: true });
      
      setTimeout(() => {
        this.simulateSingleTrain();
      }, interval);
      
    }, interval); 
  }
  
}

module.exports = SimulatedTrainArrivalsClient;