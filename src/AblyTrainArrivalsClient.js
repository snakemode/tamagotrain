const Ably = require('ably/promises');

class AblyTrainArrivalsClient {
  constructor(client) {
    this._client = client || new Ably.Realtime({ authUrl: '/api/createTokenRequest' });
  }
  
  async listenForEvents(stationName, callback) { 
    this._callback = callback;
    await this.subscribeToLine("northern");
  }
  
  async subscribeToLine(channelName) {
    const channelId = `[product:ably-tfl/tube]tube:${channelName}:940GZZLUKSX:arrivals`;
    const channel = await this._client.channels.get(channelId);
    await channel.attach();    
        
    const resultPage = await channel.history(); 
    console.log(resultPage);
    
    channel.subscribe(this.onSubscriptionMessage); 
  }
  
  onSubscriptionMessage(data) {
    console.log(data);
    
    // unpack ably message, and 
    const stationName = "KINGS CROSS"; // Something real here.
    const isArrival = true;
    const message = isArrival 
          ? { station: stationName, line: "platformId1", arrived: true } 
          : { station: stationName, line: "platformId1", departed: true };
    
    if (this._callback) {
      this._callback(message);
    }
    
  }
}

module.exports = AblyTrainArrivalsClient;