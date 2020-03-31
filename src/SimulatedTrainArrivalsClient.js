const ably = require('ably');

class SimulatedTrainArrivalsClient {
  constructor() {
    console.log("SimulatedTrainArrivalsClient created.");
  }

  async listenForEvents(stationName, callback) {
    this._callback = callback;
    this.simulateSingleTrain();
  }
  
  fakeArrival() {        
    console.log("Faking train arrival.");
    this._callback({ line: "platformId1", arrived: true });
  }
    
  fakeDeparture() {        
    console.log("Faking train arrival.");
    this._callback({ line: "platformId1", arrived: true });
  }
  
  simulateSingleTrain() {
    const interval = 1000 * 12;

    this.fakeArrival();
    
    setTimeout(() => { 
      this.fakeDeparture();
      
      setTimeout(() => {
        this.simulateSingleTrain();
      }, interval);
      
    }, interval); 
  }
  
}

module.exports = SimulatedTrainArrivalsClient;