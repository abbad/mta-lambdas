# mta-lambdas
Writing es6 code to aws Lambda.


To transpile the code run: ```node_modules\.bin\webpack``` the transpiled function should be inside a dist folder. Copy it and add it to lambda via the editor. After that configure the lambda function handler to use `index.getLineStatus`.   
