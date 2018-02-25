// lambdas/getLineStatus.js

var Mta = require('mta-gtfs');
var TurndownService = require('turndown/lib/turndown.umd.js');

// @flow
type payload = {
  currentIntent: string
};

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

function parseMtaResponse(finalResult) {
  const result = finalResult[0];
  
  return {
    name: result.name, 
    status: result.status,
    text: turnDown(result.text), 
    date: result.date, 
    time: result.time,
  }
}

function turnDown(text) {
  const turndownService = new TurndownService();
  return turndownService.turndown(text);
}

function createLambdaResponse(result) {
  const response = {
    "dialogAction": {
      "type": dialogActionTypes.close,
      "Fulfilled": dialogActionfulfillmenetStates.Fulfilled,
      "message": {
      "contentType": "PlainText",
      "content": result,
      },
    }
  }
  return response;
}

export function getLineStatus(options: payload, context: any, callback: func): void {
  console.log(
    `getLineStatus is called with the following options ${JSON.stringify(options, null, 4)}`
  );

  const maxTries = 4;
  const lineName = options.currentIntent.slots.lineName;
  const mtaBroker = new Mta({
    key: 'MY-MTA-API-KEY-HERE', // only needed for mta.schedule() method
    feed_id: 1                  // optional, default = 1
  });
  let finalResult = '';

  mtaBroker.status().then(function (result) {
    for (var key in result) {
      if (result.hasOwnProperty(key)) {
        finalResult = result[key].filter(function(item){
          return item.name == lineName;
        })
        if (finalResult != '')
          break;
        }
      }
  });

  let triesSoFar = 0;
  function wait () {
    if (triesSoFar == 4) {
      finalResult = 'Could not fetch service info';
    }
    if (finalResult == '') {
      console.log('waiting');
      triesSoFar++;
      setTimeout(wait, 2000);
    } else {    
      const mtaResponse = parseMtaResponse(finalResult);
      const response = JSON.stringify(createLambdaResponse(mtaResponse));

      context.succeed(response);
    }
  };
  wait();
}
