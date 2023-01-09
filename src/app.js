import express from "express"
import cors from "cors"



const PORT = 5000
const app = express()
app.use(express.json())
app.use(cors())

const usuarios = []
const tweets = []

app.post("/sign-up", (req, res)=>{
    const {username, avatar} = req.body
    if(!username || !avatar){
        return res.status(422).send("Por favor, preencha todos os campos")
    }
    
    usuarios.push({username: username, avatar: avatar})
    res.status(201).send("OK")
})

app.post("/tweets", (req, res)=>{
    const tweetUsuario = req.body
    const isUser = usuarios.some(user => user.username === tweetUsuario.username)
    if(isUser === false) {return res.send("UNAUTHORIZED")}
    tweets.push(tweetUsuario)
    res.send("OK")
})

app.get("/tweets", (req, res)=>{
    
    const userTweets = []
    const last10Tweets = tweets.slice(-10)
    last10Tweets.map(twt =>{
        usuarios.map(user => {
            if(twt.username === user.username){
                const fullTweet = {
                    username: twt.username,
                    avatar: user.avatar,
                    tweet: twt.tweet
                }
                userTweets.push(fullTweet)
            }
        })
    })
    res.send(userTweets)
    } 
    
)

app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`)
})

