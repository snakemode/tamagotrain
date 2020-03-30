const Ably = require('ably/promises');

class AblyTrainArrivalsClient {
  constructor(client) {
    this._client = client || new Ably.Realtime({ authUrl: '/api/createTokenRequest' });
  }
  
  async listenForEvents(stationName, callback) { 
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
    
    // unpack ably message, and 
    const arrivedMessage =  station: stationName, line: "platformId1", arrived: true };
    /* callback({ station: stationName, line: "platformId1", arrived: true });
    setTimeout(() => { callback({ station: stationName, line: "platformId1", departed: true }); }, interval);  
    */
    
    console.log(data); 
  }
}

module.exports = AblyTrainArrivalsClient;