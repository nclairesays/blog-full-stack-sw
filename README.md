# notes

# Node
*  ES6 not available on Node natively, need to install some packages
``` npm i --save-dev @babel/core @babel/node @babel/preset-env ```
* Then create a .babelrc inside the node directory
* tells babel how we want to transform ES6 to regular js
```
{"presets": ["@babel/preset-env"]}
```
* start server: ```npx babel-node src/server.js``` --> ``` nodemon --exec babel-node src/server.js" ```
* package.json ```"scripts": {"start": "nodemon --exec babel-node src/server.js"}```
* install body parse ```npm i --save body-parse```
* use body parser; allows server to extract json that is sent in req, mae sure it's above routes ``` app.use(bodyParser.json()) ```
* in req: ```app.post('/hello', (req, res) => res.send(`HELLO, ${req.body.name}!`))```



* sending a status code
``` res.status(200).send('body response') ```


## MongoDB
Go to...
``` C:\Program Files\MongoDB\Server\4.0\bin  ```
1) Run... mongod
2) New terminal, run... mongo

Some commands:
* show dbs
* use mylib  -- this wil switch to the mylib db, but won't show anything unless there's data
* db.books.insert({"name": "mongod book"})
* show collections
* db.books.find()

EXAMPLE:
in command line, create an articles collection and insert data...
``` 
use tutorial-my-blog
db.articles.insert([{
... name: 'learn-react', upvote: 0, comments: [] },
... { name: 'learn-node', upvote:0, comments: [] },
... { name: 'my-thoughts-on-resumes', upvote: 0, comments: [] }])
```

These will print/find the object:
db.articles.find({}).pretty()
db.articles.find({name: 'learn-react'}).pretty()
db.articles.findOne({name: 'learn-react'})


