# mta-lambdas
Writing es6 code to aws Lambda.


To transpile the code run: ```node_modules\.bin\webpack```. The transpiled code will be generated inside dist folder. Copy the code and add it to lambda via the editor. After that configure the lambda function handler to use `index.getLineStatus`.   

For development you can run ` npm run build` 

