// lambdas/getLineStatus.js

var Mta = require('mta-gtfs');

import { createLambdaResponse, mapLineToService, parseMtaResponse } from "./utils";

// @flow
type payload = {
  currentIntent: string
};

function getLineName(options) {
  if (options.currentIntent.slots) {
    return options.currentIntent.slots.lineName;;
  } else {
    return options.currentIntent.slotDetails.lineName.resolutions[0].value || 
      options.currentIntent.slotDetails.lineName.originalValue.originalValue ;
  }
}

export function getLineStatus(options: payload, context: any, callback: func): void {
  console.log(
    `getLineStatus is called with the following options ${JSON.stringify(options, null, 4)}`
  );
  
  const maxTries = 4;
  let lineName = getLineName(options);
  lineName = mapLineToService(lineName.toUpperCase());
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
  function wait() {
    if (triesSoFar == 4) {
      finalResult = 'Could not fetch service info';
    }
    if (finalResult == '') {
      console.log('waiting');
      triesSoFar++;
      setTimeout(wait, 2000);
    } else {    
      const mtaResponse = parseMtaResponse(finalResult);
      const response = createLambdaResponse(mtaResponse);
      
      context.succeed(response);
    }
  };
  wait();
}
