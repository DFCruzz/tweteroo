import express from "express"
import cors from "cors"

const server = express()

server.use(express.json())
server.use(cors())

const PORT = 5000
const loggedUsers= []
const tweets = []


server.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body

    const user = {
        username: username,
        avatar: avatar
    }

    if (!user.username || !user.avatar) {
        return res.status(400).send("Todos os campos são obrigatórios!")
    }

    if (!(typeof user.username === "string") || !(typeof user.avatar === "string")) {
        return res.status(400).send("Campos inválidos!")
    }


    loggedUsers.push(user)
    res.sendStatus(200)
})

server.post("/tweets", (req, res) => {

    const { username, tweet } = req.body
    const userAvatar= loggedUsers.map(a => a.avatar)

    const userTweet = {
        username: username,
        tweet: tweet,
        avatar: userAvatar
    }

    if(!loggedUsers.find((a) => a.username === username)){
        return res.status(401).send("UNAUTHORIZED")
    }
    
    if (!userTweet.tweet) {
        return res.status(400).send("Todos os campos são obrigatórios!") 
    }
    if(!(typeof userTweet.tweet === "string")){
        return res.status(400).send("Campos inválidos!")
    }
        tweets.push(userTweet)
        res.sendStatus(200)   
})

server.get("/tweets", (req, res) => {
    let latestTweets = []

    if (tweets.length >= 10) {
        latestTweets = tweets.slice(tweets.length - 10)
    }
    else {
        latestTweets = tweets
    }

    res.send(latestTweets.reverse())
})


server.listen(PORT, () => {
    console.log(`O servidor foi iniciado com sucesso! Porta: ${PORT}`)
})