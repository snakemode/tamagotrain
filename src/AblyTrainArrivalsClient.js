const Ably = require('ably/promises');
const nothing = () => { };

class AblyTrainArrivalsClient {
  constructor(client) {
    console.log("AblyTrainArrivalsClient created.");
    this._timetableAgeInMs = 0;
    this._client = client || new Ably.Realtime({ authUrl: '/api/createTokenRequest' });
    this._callback = nothing;
    this._pollingIntervalMs = 250;
  }
  
  async listenForEvents(id, callback) { 
    this._callback = callback || nothing;
    await this.subscribeToLine(id);
    setInterval(() => this.dispatchAnyMessagesDue(), this._pollingIntervalMs);    
  }  
  
  stopListening() {
    // Ably unsub.
  }
  
  async subscribeToLine(id) {
    const channelId = `[product:ably-tfl/tube]tube:${id}:arrivals`;
    const channel = await this._client.channels.get(channelId);
    await channel.attach();
        
    const resultPage = await channel.history({ untilAttach: true, limit: 1 });       
    this.timetableUpdated(resultPage.items[0]);

    channel.subscribe(this.timetableUpdated); 
  }
  
  timetableUpdated(message) {
    this._timetable = { 
      setAt: Date.now(),
      data: message.data
    };
    
    this._timetableAgeInMs = 0;
    
    console.log("Updated this._timetable", this._timetable);
  }
  
  dispatchAnyMessagesDue() {    
    this._timetableAgeInMs += this._pollingIntervalMs;
    
    if (!this._timetable) {
      return;
    }
    
    for (const [ index, item ] of this._timetable.data.entries()) {
      const itemAgeMs = item.TimeToStation * 1000;

      if (itemAgeMs > this._timetableAgeInMs) {
        continue;
      }
      
      console.log("Train from timetable reached arrival.", this._timetable.setAt, item);

      // Work out when to raise a departure message
      const departsInMs = this._timetable.data.length > index + 1
                      ? (this._timetable.data[index + 1].TimeToStation * 1000) / 2
                      : 15000;

      console.log("Scheduling departure for " + departsInMs + " from now.");
      
      this.raiseMessagesFor(item, departsInMs);
      item.completed = true;
    }

    this._timetable.data = this._timetable.data.filter(i => !i.completed);
  }

  raiseMessagesFor(item, departsInMs) {

    this._callback({ 
      line: "platformId1", 
      arrived: true,
      source: this.constructor.name, 
      sourceMessage: item,
      departsInMs: departsInMs
    });

    setTimeout(() => {

       this._callback({ 
         line: "platformId1", 
         departed: true, 
         source: this.constructor.name, 
         sourceMessage: item
        });

    }, departsInMs);  
  } 
  
}

module.exports = AblyTrainArrivalsClient;