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
  
  stopListening() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }
  
  simulateSingleTrain() {
    const interval = 1000 * 12;

    this.fakeArrival();
    
    this._timeout = setTimeout(() => { 
      this.fakeDeparture();      
      this._timeout = setTimeout(() => { this.simulateSingleTrain(); }, interval);      
    }, interval); 
  }
  
  fakeArrival() {        
    console.log("Faking train arrival.");
    this._callback({ line: "platformId1", arrived: true, source: this.constructor.name });
  }
    
  fakeDeparture() {        
    console.log("Faking train departure.");
    this._callback({ line: "platformId1", departed: true, source: this.constructor.name });
  }

  
}

module.exports = SimulatedTrainArrivalsClient;