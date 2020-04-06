const ably = require('ably');

class SimulatedTrainArrivalsClient {
  constructor() {
    this.stopped = false;
    console.log("SimulatedTrainArrivalsClient created.");
  }

  async listenForEvents(id, callback) {
    console.log("Faking train arrivals for", id);
    
    this._callback = callback;
    this.simulateSingleTrain();
  }
  
  stopListening() {
    console.log("Stopping SimulatedTrainArrivalsClient.");
    
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
    
    this.stopped = true;
  }
  
  async simulateSingleTrain() {
    const interval = 1000 * 12;
    
    this.fakeArrival();
    await sleep(interval); 
    
    if (!this.stopped) {
      this.fakeDeparture();    
      this._timeout = setTimeout(async () => await this.simulateSingleTrain(), interval);
    }
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

const sleep = (timeout) => new Promise(r => setTimeout(r, timeout));


module.exports = SimulatedTrainArrivalsClient;