import express from "express"
import cors from "cors"

const server = express()

server.use(express.json())
server.use(cors())

const PORT = 5000
const loggedUser= []

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
        return res.Status(400).send("Campos inválidos!")
    }


    loggedUser.push(user)
    res.sendStatus(200)
})


server.listen(PORT, () => {
    console.log(`O servidor foi iniciado com sucesso! Porta: ${PORT}`)
})