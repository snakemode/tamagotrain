const ably = require('ably');

class SimulatedTrainArrivalsClient {
  constructor() {
    console.log("SimulatedTrainArrivalsClient created.");
  }

  async listenForEvents(id, callback) {
    console.log("Faking train arrivals for", id);
    
    this._callback = callback;
    this.simulateSingleTrain();
  }  
  
  simulateSingleTrain() {
    const interval = 1000 * 12;

    this.fakeArrival();
    
    this._timeout = setTimeout(() => { 
      this.fakeDeparture();      
      setTimeout(() => { this.simulateSingleTrain(); }, interval);      
    }, interval); 
  }
  
  fakeArrival() {        
    console.log("Faking train arrival.");
    this._callback({ line: "platformId1", arrived: true });
  }
    
  fakeDeparture() {        
    console.log("Faking train departure.");
    this._callback({ line: "platformId1", departed: true });
  }

  
}

module.exports = SimulatedTrainArrivalsClient;