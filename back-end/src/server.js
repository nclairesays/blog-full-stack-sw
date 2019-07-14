import express from 'express';
import bodyParser from 'body-parser'

// 1) create app object
const app = express();
// 4) use body parser; allows server to extract json that is sent in req, mae sure it's above routes
app.use(bodyParser.json())

// now that we have an app object, 
// 2) we can now define endpoints and actions when endpoints are hit

// 2.1) send a response back; res.send('BODY RESPONSE')
app.get('/hello', (req, res) => (res.send('Hello! THis is in the response.Will show up in body of html.')))
app.post('/hello', (req, res) => res.send(`HELLO, ${req.body.name}!`))

// 3) need to start the server
app.listen(8000, () => console.log('Listening on port 8000'))