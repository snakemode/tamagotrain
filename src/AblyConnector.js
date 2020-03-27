class StubAblyConnector {
  constructor() {
    this.callbacks = {};
  }
  
  hasCallbacksFor(stationName) {
    const stationCallbacks = Object.getOwnPropertyNames(this.callbacks);    
    if (stationCallbacks.indexOf(stationName) == -1) {
      return false;
    }
    return true;
  }
  
  onArrivalTo(stationName, callback) {    
    if(!this.hasCallbacksFor(stationName)) {
      this.callbacks[stationName] = [];
    }
    
    this.callbacks[stationName].push(callback);
  }
  
  onIncomingData(data) {
    const stationName = data.stationName;    
    console.log(this.callbacks);
    console.log(this);
    for (let cb of this.callbacks[stationName]) {      
      cb(data);      
    }
  }
  
  fakeIncomingData(stationName) {
    // Train arrives and departs every 2 seconds.
    const interval = 1000 * 12;    
    this.onIncomingData({ station: stationName, line: "platformId1", arrived: true });
    setTimeout(() => { this.onIncomingData({ station: stationName, line: "platformId1", departed: true }); }, interval);      
  }  
}

module.exports = StubAblyConnector;