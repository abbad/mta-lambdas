var converter = require('html-to-markdown');

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
  return `${result.status} ${sanitizeAndMarkDown(result.text)}`
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

function sanitizeAndMarkDown(text) {
  return converter.convert(text.replace(/<br>|<br\/>/g, ''));
}
