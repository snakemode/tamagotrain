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
    channel.subscribe(this.onSubscriptionMessage); 
  }
  
  onSubscriptionMessage(data) {
    console.log(data); 
  }
}

module.exports = AblyTrainArrivalsClient;