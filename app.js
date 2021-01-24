const express = require('express')
const {PinpointClient, PutEventsCommand, PutEventsCommandInput} = require('@aws-sdk/client-pinpoint');
const moment = require("moment");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const params = {
    ApplicationId: "dc2d4b70fafd4a439806b465dd0b9bf1",
    EventsRequest: {
        BatchItem: {
            randomID: {
                Endpoint: {},
                Events: {
                    eventId: {
                        EventType: 'aaaaaaaa',
                        Timestamp: moment().format('yyyy-MM-DDThh:mm:ss')
                    }
                }
            }
        }
    }
}

const REGION = "ap-northeast-1";
let command = new PutEventsCommand(params);

const client = new PinpointClient({region: REGION});

client.send(command).then((data) => {
    console.error(data.$metadata.httpStatusCode)
    console.error(data.EventsResponse.Results['randomID'])
})