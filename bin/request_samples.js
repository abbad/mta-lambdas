module.exports = Object.freeze({
  lexRequestBasicRequest: {
    "messageVersion": "1.0",
    "invocationSource": "FulfillmentCodeHook",
    "userId": "351iawvszfk85ln1lqo0lc96h7dyvs9n",
    "sessionAttributes": null,
    "bot": {
        "name": "TransitBot",
        "alias": null,
        "version": "$LATEST"
    },
    "outputDialogMode": "Text",
    "currentIntent": {
        "name": "transitStatus",
        "slots": {
            "lineName": "123"
        },
        "confirmationStatus": "None"
    },
    "inputTranscript": "NQR"
  },
  lexRequestWithSlotDetails: {
    "messageVersion": "1.0",
    "invocationSource": "FulfillmentCodeHook",
    "userId": "mfx1g3gaxc4wc2w0bhyofzs3l21fbqca",
    "sessionAttributes": {},
    "requestAttributes": null,
    "bot": {
        "name": "TransitBot",
        "alias": "$LATEST",
        "version": "$LATEST"
    },
    "outputDialogMode": "Text",
    "currentIntent": {
        "name": "transitStatus",
        "slots": {
            "lineName": null
        },
        "slotDetails": {
            "lineName": {
                "resolutions": [
                    {
                        "value": "L"
                    }
                ],
                "originalValue": "L"
            }
        },
        "confirmationStatus": "None"
    },
    "inputTranscript": "is the L train running"
  }
});
