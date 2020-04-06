const Ably = require('ably/promises');

class AblyTrainArrivalsClient {
  constructor(client) {
    console.log("AblyTrainArrivalsClient created.");
    this._timetableAgeInSeconds = 0;
    this._client = client || new Ably.Realtime({ authUrl: '/api/createTokenRequest' });
  }
  
  async listenForEvents(id, callback) { 
    this._callback = callback;
    setInterval(() => this.dispatchAnyMessagesDue(), 1000 * 1);
    
    await this.subscribeToLine(id);
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
    console.log("Timetable snapshot updated.");
    this._timetable = message.data;
    this._timetableAgeInSeconds = 0;
    
    for (const entry of this._timetable) {
      console.log(entry);
    }

  }
  
  dispatchAnyMessagesDue() {    
    this._timetableAgeInSeconds++;
    
    if (!this._timetable) {
      return;
    }
    
    for (const [ index, item ] of this._timetable.entries()) {
      if (item.TimeToStation > this._timetableAgeInSeconds) {
        continue;
      }
      
      console.log("Train from timetable reached arrival.");
      console.log(item);

      // Work out when to raise a departure message
      const departsAt = this._timetable.length > index + 1
                      ? this._timetable[index + 1].TimeToStation / 2
                      : 15;

      console.log("Scheduling departure for " + 1000 * departsAt + " from now.");
      
      // Raise messages
      item.completed = true;
      this.raiseEvent(true);
      setTimeout(() => this.raiseEvent(false), 1000 * departsAt);  
    }
    
    this._timetable = this._timetable.filter(i => !i.completed);
  }
  
  raiseEvent(isArrival) {
    const message = isArrival 
          ? { line: "platformId1", arrived: true, source: this.constructor.name } 
          : { line: "platformId1", departed: true, source: this.constructor.name };
    
    if (this._callback) {
      this._callback(message);
    }
  }
  
}

module.exports = AblyTrainArrivalsClient;


/*

Incoming data example.

{
    "name": "data",
    "id": "7ARFsAk7ld:0:0",
    "encoding": null,
    "data": [{
        "Id": "-1711142636",
        "OperationType": 1,
        "VehicleId": "000",
        "NaptanId": "940GZZLUEUS",
        "StationName": "Euston Underground Station",
        "LineId": "northern",
        "LineName": "Northern",
        "PlatformName": "Southbound - Platform 2",
        "Direction": "inbound",
        "Bearing": "",
        "DestinationNaptanId": "940GZZLUKNG",
        "DestinationName": "Kennington Underground Station",
        "Timestamp": "2020-03-31T13:24:31.0891267Z",
        "TimeToStation": 171,
        "CurrentLocation": "At Camden Town",
        "Towards": "Kennington via CX",
        "ExpectedArrival": "2020-03-31T13:27:22Z",
        "TimeToLive": "2020-03-31T13:27:22Z",
        "ModeName": "tube",
        "Timing": {
            "CountdownServerAdjustment": "00:00:00",
            "Source": "0001-01-01T00:00:00",
            "Insert": "0001-01-01T00:00:00",
            "Read": "2020-03-31T13:24:31.091Z",
            "Sent": "2020-03-31T13:24:31Z",
            "Received": "0001-01-01T00:00:00"
        }
    }, {
        "Id": "-1711142636",
        "OperationType": 1,
        "VehicleId": "000",
        "NaptanId": "940GZZLUEUS",
        "StationName": "Euston Underground Station",
        "LineId": "northern",
        "LineName": "Northern",
        "PlatformName": "Northbound - Platform 1",
        "Direction": "outbound",
        "Bearing": "",
        "DestinationNaptanId": "940GZZLUEGW",
        "DestinationName": "Edgware Underground Station",
        "Timestamp": "2020-03-31T13:24:31.0891267Z",
        "TimeToStation": 411,
        "CurrentLocation": "Between Embankment and Charing Cross",
        "Towards": "Edgware via CX",
        "ExpectedArrival": "2020-03-31T13:31:22Z",
        "TimeToLive": "2020-03-31T13:31:22Z",
        "ModeName": "tube",
        "Timing": {
            "CountdownServerAdjustment": "00:00:00",
            "Source": "0001-01-01T00:00:00",
            "Insert": "0001-01-01T00:00:00",
            "Read": "2020-03-31T13:24:31.091Z",
            "Sent": "2020-03-31T13:24:31Z",
            "Received": "0001-01-01T00:00:00"
        }
    },
    
    */