# notes

# Node
*  ES6 not available on Node natively, need to install some packages
``` npm i --save-dev @babel/core @babel/node @babel/preset-env ```
* Then create a .babelrc inside the node directory
* tells babel how we want to transform ES6 to regular js
``` 
{
    "presets": ["@babel/preset-env"]
} 
```
* start server: ```npx babel-node src/server.js```
* package.json ```"scripts": {"start": "nodemon --exec babel-node src/server.js"}```
* install body parse ```npm i --save body-parse```
* use body parser; allows server to extract json that is sent in req, mae sure it's above routes ``` app.use(bodyParser.json()) ```
* in req: ```app.post('/hello', (req, res) => res.send(`HELLO, ${req.body.name}!`))```



* sending a status code
``` res.status(200).send('body response') ```