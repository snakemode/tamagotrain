//const AblyTrainArrivalsClient = require("./AblyTrainArrivalsClient");

describe("temp", () => {
  
    it("something something merge a response", () => {
      const resp = fakeResponseCorrectShape;
      
      const allLines = Object.getOwnPropertyNames(resp.data);
      let allTrains = [];
      
      for (let lineName of allLines) {
        const arrayOfTrains = resp.data[lineName];
        
        allTrains = allTrains.concat(arrayOfTrains);
      }

      console.log(allTrains);
      
    });
  
});



// Sorry mum

const fakeResponseCorrectShape = {
  "name": "data",
  "id": "hcNh8VMXkP:0:0",
  "encoding": null,
  "data": {
    "line 1": [
      {
        "Id": "825078308",
        "OperationType": 1,
        "VehicleId": "523",
        "NaptanId": "940GZZLUKSX",
        "StationName": "King's Cross St. Pancras Underground Station",
        "LineId": "hammersmith-city",
        "LineName": "Hammersmith & City",
        "PlatformName": "Eastbound - Platform 2",
        "Direction": "outbound",
        "Bearing": "",
        "DestinationNaptanId": "940GZZLUBKG",
        "DestinationName": "Barking Underground Station",
        "Timestamp": "2020-04-15T14:59:13.0492223Z",
        "TimeToStation": 100,
        "CurrentLocation": "At Royal Oak Platform 2",
        "Towards": "Barking",
        "ExpectedArrival": "2020-04-15T15:12:06Z",
        "TimeToLive": "2020-04-15T15:12:06Z",
        "ModeName": "tube"
      },
      {
        "Id": "-272289981",
        "OperationType": 1,
        "VehicleId": "524",
        "NaptanId": "940GZZLUKSX",
        "StationName": "King's Cross St. Pancras Underground Station",
        "LineId": "hammersmith-city",
        "LineName": "Hammersmith & City",
        "PlatformName": "Eastbound - Platform 2",
        "Direction": "outbound",
        "Bearing": "",
        "DestinationNaptanId": "940GZZLUBKG",
        "DestinationName": "Barking Underground Station",
        "Timestamp": "2020-04-15T14:59:13.0492223Z",
        "TimeToStation": 200,
        "CurrentLocation": "At Hammersmith Platform 1",
        "Towards": "Barking",
        "ExpectedArrival": "2020-04-15T15:21:06Z",
        "TimeToLive": "2020-04-15T15:21:06Z",
        "ModeName": "tube"
      }
    ],
    "line 2": [
      {
        "Id": "825078308",
        "OperationType": 1,
        "VehicleId": "523",
        "NaptanId": "940GZZLUKSX",
        "StationName": "King's Cross St. Pancras Underground Station",
        "LineId": "hammersmith-city",
        "LineName": "Hammersmith & City",
        "PlatformName": "Eastbound - Platform 2",
        "Direction": "outbound",
        "Bearing": "",
        "DestinationNaptanId": "940GZZLUBKG",
        "DestinationName": "Barking Underground Station",
        "Timestamp": "2020-04-15T14:59:13.0492223Z",
        "TimeToStation": 150,
        "CurrentLocation": "At Royal Oak Platform 2",
        "Towards": "Barking",
        "ExpectedArrival": "2020-04-15T15:12:06Z",
        "TimeToLive": "2020-04-15T15:12:06Z",
        "ModeName": "tube"
      },
      {
        "Id": "-272289981",
        "OperationType": 1,
        "VehicleId": "524",
        "NaptanId": "940GZZLUKSX",
        "StationName": "King's Cross St. Pancras Underground Station",
        "LineId": "hammersmith-city",
        "LineName": "Hammersmith & City",
        "PlatformName": "Eastbound - Platform 2",
        "Direction": "outbound",
        "Bearing": "",
        "DestinationNaptanId": "940GZZLUBKG",
        "DestinationName": "Barking Underground Station",
        "Timestamp": "2020-04-15T14:59:13.0492223Z",
        "TimeToStation": 350,
        "CurrentLocation": "At Hammersmith Platform 1",
        "Towards": "Barking",
        "ExpectedArrival": "2020-04-15T15:21:06Z",
        "TimeToLive": "2020-04-15T15:21:06Z",
        "ModeName": "tube"
      }
    ]
  }
}
