// bin/try-hello.js

var getLineStatusModule = require("../dist/getLineStatus.js");

var fakeLambdaContext = {
  succeed: function succeed(results) {
    console.log(results);
    process.exit(0);
  }
};

getLineStatusModule.getLineStatus({lineName: "L"}, fakeLambdaContext);
