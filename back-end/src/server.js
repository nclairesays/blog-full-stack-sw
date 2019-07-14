import express from 'express';
import bodyParser from 'body-parser'

// 1) create app object
const app = express();
// 4) use body parser; allows server to extract json that is sent in req, mae sure it's above routes
app.use(bodyParser.json())

// now that we have an app object, 
// 2) we can now define endpoints and actions when endpoints are hit

// 2.1) send a response back; res.send('BODY RESPONSE')
// app.get('/hello', (req, res) => (res.send('Hello! THis is in the response.Will show up in body of html.')))
// app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}`))
// app.post('/hello', (req, res) => res.send(`HELLO, ${req.body.name}!`))


// 4) use temp data, ability to upvote article
const articlesInfo = {
    'learn-react': { upvote: 0, comments: [] },
    'learn-node': { upvote: 0, comments: [] },
    'my-thoughts-on-resumes': { upvote: 0, comments: [] }
} 

app.post('/api/articles/:name/upvote', (req, res) => {
    const articleName = req.params.name;
    const upvoteCount = articlesInfo[articleName].upvote += 1;
    res.status(200).send(`${articleName} now has ${upvoteCount} upvoes`)
})

app.post('/api/articles/:name/add-comment', (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;

    articlesInfo[articleName].comments.push({ username, text })
    res.status(200).send(articlesInfo[articleName])
})


// 3) need to start the server
app.listen(8000, () => console.log('Listening on port 8000'))