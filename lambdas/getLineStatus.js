// lambdas/getLineStatus.js
var Mta = require('mta-gtfs');

/* @flow */
type args = {
  currentIntent: string
};

export function getLineStatus(options: args, context: any): void {
  console.log(`getLineStatus is called with the following options
    ${JSON.stringify(options, null, 4)}`);

  const maxTries = 4;
  const lineName = options.currentIntent.slots.lineName;
  let finalResult = '';
  const mta_object = new Mta({
    key: 'MY-MTA-API-KEY-HERE', // only needed for mta.schedule() method
    feed_id: 1                  // optional, default = 1
  });

  mta_object.status(null).then(function (result) {
    for (var key in result) {
      if (result.hasOwnProperty(key)) {
        finalResult = result[key].filter(function(item){
          return item.name == lineName;
        })
        if (finalResult != '')
          break;
        }
      }
    })

  let triesSoFar = 0;
  function wait () {
    if (triesSoFar == 4) {
      finalResult = 'Could not fetch service info';
    }
    if (finalResult == '') {
      console.log('waiting');
      triesSoFar++;
      setTimeout(wait, 2000);
    } else{
      let str = JSON.stringify(finalResult, null, 4);
      context.succeed(`${str}`);
    }
  };
  wait();
}
