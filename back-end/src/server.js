import express from 'express';
import bodyParser from 'body-parser'
// 6) install mongo client
import { MongoClient } from 'mongodb'


// 1) create app object
const app = express();
// 5) use body parser; allows server to extract json that is sent in req, mae sure it's above routes
app.use(bodyParser.json())

// now that we have an app object, 
// 2) we can now define endpoints and actions when endpoints are hit

// 2.1) send a response back; res.send('BODY RESPONSE')
// app.get('/hello', (req, res) => (res.send('Hello! THis is in the response.Will show up in body of html.')))
// app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}`))
// app.post('/hello', (req, res) => res.send(`HELLO, ${req.body.name}!`))


// 4) use temp data, ability to upvote article, later mongo
// const articlesInfo = {
//     'learn-react': { upvote: 0, comments: [] },
//     'learn-node': { upvote: 0, comments: [] },
//     'my-thoughts-on-resumes': { upvote: 0, comments: [] }
// } 

// app.get('/api/articles/:name', async (req, res) => {
//     try  {
//         const articleName = req.params.name;
//         // 6) default localhost, must use useNewUrlParse for now?
//         // MongoClient.connect will return a client object that we can use to send query to the database
//         const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParse: true })
//         const db = client.db('tutorial-my-blog');
//         const articleInfo = await db.collection('articles').findOne({ name: articleName})
        
//         res.status(200).json(articleInfo) //could use res.send but res.json works better with json files
//         client.close()
//     } catch (err) {
//         res.status(500).json({ message: 'Error connecting to db', error })
//     }
// })

// // 7)  will be very similar to the above, but need to do an updated query; and send updated info to client
// app.post('/api/articles/:name/upvote', async (req, res) => {
//     try {
//         const articleName = req.params.name;

//         const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParse: true })
//         const db = client.db('tutorial-my-blog');
//         const articleInfo = await db.collection('articles').findOne({ name: articleName})

//         // 7.1) can use updateOne -- first argument, find the one where the name matches
//         //      second argument, the actual updates that we want to apply to the object
//         //      use a special property in single quotes? '$set', the value is what will be changed
//         await db.collection('articles').updateOne({ name: articleName }, {
//             '$set': { 
//                 upvote: articleInfo.upvote + 1
//             }
//         })

//         // 7.2 send the updated info back by finding and then sending it
//         const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName})
//         res.status(200).json(updatedArticleInfo)

//         client.close()

//     } catch (err) {
//         res.status(500).json({ message: 'Error connecting to db', error })
//     }
    
// })

// 8) REFACTOR TO KEEP IT TRY
// this function will take other functions as arguments
// operations will be the non-database related stuff
const withDB = async (operations, res) => {
    try  {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParse: true })
        const db = client.db('tutorial-my-blog');
        
        await operations(db)

        client.close()
    } catch (err) {
        res.status(500).json({ message: 'Error connecting to db', error })
    }
}

// 8.1 refactoring
// db  or (client.db('tutuorial-my-blog)) gets passed into the operations function below
app.get('/api/articles/:name', async (req, res) => {
    withDB( async db => {

        const articleName = req.params.name
        const articleInfo = await db.collection('articles').findOne({ name: articleName})
        res.status(200).json(articleInfo)  

    }, res)    
})

app.post('/api/articles/:name/upvote', async (req, res) => {
    withDB( async db => {

        const articleName = req.params.name
        const articleInfo = await db.collection('articles').findOne({ name: articleName})

        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                upvote: articleInfo.upvote + 1
            }
        })

        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName})
        res.status(200).json(updatedArticleInfo)
    })
})

app.post('/api/articles/:name/add-comment', (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name

    withDB(async db => {
        const articleInfo = await db.collection('articles').findOne({ name: articleName })
        await db.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                comments: articleInfo.comments.concat({ username, text })
            }
        })
        const updatedArticleInfo = await db.collection('articles').findOne({ name: articleName })
        res.status(200).json(updatedArticleInfo)
    }, res)
})



// 3) need to start the server
app.listen(8000, () => console.log('Listening on port 8000'))