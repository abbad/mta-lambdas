// bin/try-hello.js

var getLineStatusModule = require("../dist/getLineStatus.js");
var requestSamples = require("./request_samples")

var fakeLambdaContext = {
  succeed: function succeed(results) {
    console.log(JSON.stringify(results, null, 4));
    
    process.exit(0);
  }
};

getLineStatusModule.getLineStatus(requestSamples.lexRequestWithLineName('1'), fakeLambdaContext);
