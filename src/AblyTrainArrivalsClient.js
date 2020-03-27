const ably = require('ably');

class AblyTrainArrivalsClient {
  constructor(client) {
    this._client = new ably.Realtime({ authUrl: '/api/createTokenRequest' });
  }
  
  async subscribeToLine(channelName, onSubscriptionData) {
    const channelId = `[product:ably-tfl/tube]tube:${channelName}:940GZZLUKSX:arrivals`;
    const channel = ably.channels.get(channelId);

    await this.attachPromise(channel);  
    channel.subscribe(this.onSubscriptionMessage); 

    const resultPage = await this.getHistoryPromise(channel, { untilAttach: true, limit: 1 });
    console.log("History retrieved for " + channelName); 

    const recentMessage = resultPage.items[0] || { data: [] }; 
    return recentMessage.data;
  }
  
  onSubscriptionMessage(data) {
    console.log(data); 
  }
  
  async attachPromise(channel) {
    return new Promise((resolve, reject) => {
      channel.attach(err => {      
        if (err) { reject(err); } else { resolve(); }
      });
    });
  }

  async getHistoryPromise(channel, params) {
    return new Promise((resolve, reject) => {
      channel.history(params, (err, response) => {
        if (err) { reject(err); } else { resolve(response); }
      });
    });
  }
}

module.exports = AblyTrainArrivalsClient;