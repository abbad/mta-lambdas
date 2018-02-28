// @flow

var slackify = require('slackify-html');

const dialogActionTypes = {
  ElicitIntent: "ElicitIntent",
  ElicitSlot: "ElicitSlot",
  ConfirmIntent: "ConfirmIntent",
  Delegate: "Delegate",
  Close: "Close",
};

const dialogActionfulfillmenetStates = {
  Fulfilled: "Fulfilled",
  Failed: "Failed"
};

export function parseMtaResponse(finalResult) {
  const result = finalResult[0];

  if (result.status === 'GOOD SERVICE') {
    return 'It is running as expected.'
  } else {
    return sanitizeAndMarkDown(result.text);
  }
}
  
export function createLambdaResponse(result) {
  const response = {
    "dialogAction": {
      "type": dialogActionTypes.Close,
      "fulfillmentState": dialogActionfulfillmenetStates.Fulfilled,
      "message": {
        "contentType": "PlainText",
        "content": result,
      },
    }
  }
  return response;
}

export function mapLineToService(lineName: string): string {
  
  switch(lineName) {
    case "1" || "2" || "3":
      return "123"    
    case "N" || "Q" || "R":
      return "NQR"
    case "A" || "C" || "E":
      return "ACE"
    case "L":
      return "L"
    default:
      return "L" // Change this.
  }
}

function sanitizeAndMarkDown(text: string): string {
  return slackify(text).replace(/<|>|undefined|\r|\n|\|/g, '')
    .replace(/-/g, ' - ').replace(/_/g, ' _ ');
}
