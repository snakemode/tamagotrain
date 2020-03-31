const Ably = require('ably/promises');

class AblyTrainArrivalsClient {
  constructor(client) {
    this._client = client || new Ably.Realtime({ authUrl: '/api/createTokenRequest' });
  }
  
  async listenForEvents(stationName, callback) { 
    this._callback = callback;
    setInterval(() => this.dispatchAnyMessagesDue(), 1000 * 1);
    
    await this.subscribeToLine("940GZZLUKSX", "northern");
  }
  
  async subscribeToLine(stationId, lineName) {
    const channelId = `[product:ably-tfl/tube]tube:${lineName}:${stationId}:arrivals`;
    const channel = await this._client.channels.get(channelId);
    await channel.attach();    
        
    const resultPage = await channel.history({ untilAttach: true, limit: 1 });
    console.log(resultPage);
    
    channel.subscribe(this.timetableUpdated); 
  }
  
  timetableUpdated(message) {
    this._timetable = message.data;
    this._timetableAgeInSeconds = 0;
    console.log(message.data);
  }
  
  dispatchAnyMessagesDue() {    
    this._timetableAgeInSeconds++;
    
    for (const item of this._timetable.data) {
      // if age >= TimeToStation create a train arrival and pop the message
      // if there are more records, send a departure message for current train
      // to arive at 50% of the next trains TimeToStation
      // Even if the timetalbe is replaced, this departure message will still fire to "clear the platform"
      
      if (item.TimeToStation > this._timetableAgeInSeconds) {
        this.raiseEvent(true);
        setTimeout(() => this.raiseEvent(false), 1000 * 15); // 15 seconds for now.
      }
      
    }
  }
  
  raiseEvent(isArrival) {
    const message = isArrival 
          ? { line: "platformId1", arrived: true } 
          : { line: "platformId1", departed: true };
    
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