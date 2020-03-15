
class StubAblyConnector {
  constructor() {
    this.callbacks = {};
  }
  
  onArrivalTo(stationName, callback) {
    const stationCallbacks = Object.getOwnPropertyNames(this.callbacks);
    
    if(stationCallbacks.indexOf(stationName) == -1) {
      this.callbacks[stationName] = [];
    }
    
    this.callbacks[stationName].push(callback);
  }
  
  fakeTrainArrival(stationName) {
    for (let cb of this.callbacks[stationName]) {
      cb({ station: stationName, line: "platformId1", arrived: true });
    }
  }
}

if (typeof(module) != 'undefined') {
  module.exports = StubAblyConnector;
}