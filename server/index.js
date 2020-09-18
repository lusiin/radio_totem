const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
  
const handler = (req, res) => {
    const d = new Date()
    res.end(d.toString())
    console.log("hi")
  }
  
module.exports = allowCors(handler)


const user = require(exports);
// start server: npm run dev
// 

const express = require("express");
const cors = require('cors');
const monk = require("monk");
const Filter = require('bad-words');
const rateLimit = require("express-rate-limit");

const app = express();


const db = monk(process.env.MONGODB_URI);
const posts = db.get("post");
const filter = new Filter();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
       res.json({
           message: "POST"
       });
});



app.get("/beitraege", (req, res)=> {
    posts
        .find()
        .then(posts => {
            res.json(posts)
        })

})

function isValidPost(post){
    return post.name && post.name.toString().trim() !== "" &&
        post.content && post.content.toString().trim() !=="";
}

app.use(rateLimit({
    windowMs: 30 * 1000, // 30 sec
    max: 1 // limit each IP to 100 requests per windowMs
  }));

app.post("/beitraege", (req, res) => {
    if (isValidPost(req.body)){
        const post = {
            name: filter.clean(req.body.name.toString()),
            content: filter.clean(req.body.content.toString()),
            created: new Date()
        };
        //console.log(post);
        posts
            .insert(post)
            .then(createdPost => {
                 res.json(createdPost);
                  })
            .catch(err => {
            return Promise.reject();
        })
        
    }else {
        res.status(422);
        res.json({
           message: "Hey, Titel und Inhalt werden benötigt!" 
        });
    }
});

app.listen(5000, () => {
  console.log('Listening on http://localhost:5000');
});
