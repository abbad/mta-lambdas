# Lambda-MTA-Bot. 
Writing ES6 code to fetch MTA Info and to present it for slack. 

This code is deployed to AWS Lambda which is connected to Amazon Lex to get users requests about a certain train or a line. 

User input is taken from a Slack channel and then its sent to Amazon Lex. Based on the intent, Amazon Lex will call AWS Lambda to fullfill the request(This code). 


For development you can run `npm start` 

To transpile the code run: ```node_modules\.bin\webpack```. The transpiled code will be generated inside dist folder. Copy the code and add it to lambda via the editor. After that configure the lambda function handler to use `index.getLineStatus`.   
