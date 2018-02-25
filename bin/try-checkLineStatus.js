// bin/try-hello.js

var getLineStatusModule = require("../dist/getLineStatus.js");

var fakeLambdaContext = {
  succeed: function succeed(results) {
    console.log(results);
    process.exit(0);
  }
};

const lexRequest = {
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
            "lineName": "NQR"
        },
        "confirmationStatus": "None"
    },
    "inputTranscript": "NQR"
};


getLineStatusModule.getLineStatus(lexRequest, fakeLambdaContext);
