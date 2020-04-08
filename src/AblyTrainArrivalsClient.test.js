const AblyTrainArrivalsClient = require("./AblyTrainArrivalsClient");

describe("AblyTrainArrivalsClient", async () => {

    let sut, ably, ablyChannel;
    beforeEach(() => {
        ablyChannel = {
            attach: () => { },
            subscribe: () => { },
            history: (_) => fullAblyResponse()
        };
        
        ably = {};
        ably.channels = {};
        ably.channels.get = async () => ablyChannel;

        sut = new AblyTrainArrivalsClient(ably);
    });

    it("listenForEvents raises a message when a train passes its TimeToStation time", async () => {
        let returnedMessages = [];

        sut.listenForEvents("some-line-id", message => returnedMessages.push(message));
        await sleep(1200);
        
        expect(returnedMessages[0].arrived).toBe(true);
        expect(returnedMessages[0].sourceMessage.Towards).toBe("Kennington via CX");
    });
    
    it("listenForEvents raises a departed message half way to the arrival of the next train", async () => {
        let returnedMessages = [];

        sut.listenForEvents("some-line-id", message => returnedMessages.push(message));
        await sleep(2100);
        
        expect(returnedMessages[0].departsInMs).toBe(1000);
        expect(returnedMessages[1].departed).toBe(true);
        expect(returnedMessages[1].sourceMessage.Towards).toBe("Kennington via CX");
    });

    it("listenForEvents still sends train departure notifications when timetable is replaced", async () => {
        let returnedMessages = [];

        sut.listenForEvents("some-line-id", message => returnedMessages.push(message));
        await sleep(1100);
        
        sut.timetableUpdated(pushedAblyUpdate().items[0]);
        await sleep(1100);
        
        expect(returnedMessages[1].departed).toBe(true);
        expect(returnedMessages[1].sourceMessage.Towards).toBe("Kennington via CX");
    });

    it("listenForEvents respects new timetable when timetable replaced", async () => {
        let returnedMessages = [];
        const updatedTimetable = pushedAblyUpdate();

        sut.listenForEvents("some-line-id", message => returnedMessages.push(message));
        await sleep(1100);
        
        sut.timetableUpdated(updatedTimetable.items[0]);
        await sleep(3000);
        
        expect(returnedMessages[2].sourceMessage.Towards).toBe("Edgware via CX - replaced");
    });
});

const fullAblyResponse = () => {

    const trains = [{
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
        "TimeToStation": 1,
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
    }, 
    {
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
        "TimeToStation": 2,
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
    }];

    return {
        items: [
            {
                "name": "data",
                "id": "7ARFsAk7ld:0:0",
                "encoding": null,
                "data": trains
            }
        ]
    };
}


const pushedAblyUpdate = () => {
    return {
        items: [
            {
                "name": "data",
                "id": "7ARFsAk7ld:0:0",
                "encoding": null,
                "data":  [{
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
                    "TimeToStation": 2,
                    "CurrentLocation": "Between Embankment and Charing Cross",
                    "Towards": "Edgware via CX - replaced",
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
                }]
            }
        ]
    };
}

const sleep = (timeout) => new Promise(r => setTimeout(r, timeout));