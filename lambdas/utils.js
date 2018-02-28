// @flow

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

function sanitizeAndMarkDown(text) {
  let markedDown = converter.convert(text);
  return markedDown.replace(/<\/?span[^>]*>/g,"")
    .replace(/<\/?br[^>]*>/g, '\n').replace(/<\/?a[^>]*>/g,"")
    .replace(/<\/?font[^>]*>/);
}
