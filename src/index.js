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
    res.status(201).send("OK")
})

server.post("/tweets", (req, res) => {

    const { tweet } = req.body
    const loggedUser = loggedUsers.map(a => a.username)
    const userAvatar= loggedUsers.map(a => a.avatar)

    const userTweet = {
        username: userAvatar,
        tweet: tweet,
        avatar: loggedUser
    }

    if(!loggedUser.find((a) => a.username === username)){
        return res.sendStatus(401)
    }
    
    if (!userTweet.tweet) {
        return res.status(400).send("Todos os campos são obrigatórios!") 
    }
    if(!(typeof userTweet.tweet === "string")){
        return res.status(400).send("Campos inválidos!")
    }
        tweets.push(userTweet)
        res.status(201).send("OK")    
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