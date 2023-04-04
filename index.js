import express from "express";
import cors from 'cors'
import morgan from "morgan";
import Connection from "./database/db.js";
import dotenv from "dotenv"
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import conversationRoutes from './routes/conversationRoutes.js'
import http from 'http'
import { Server } from "socket.io";
import path from 'path'
const app = express()
const server = http.createServer(app)
const io = new Server(server)
const port = process.env.PORT || 80;
app.use(cors())
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/chat', messageRoutes)
app.use('/api/v1/conversation', conversationRoutes)
app.use(express.static('./client/build'))
Connection()
dotenv.config()

let users = []

const addUser = (uderData, socketId) => {
    !users.some(user => user?._id == uderData?._id) && users.push({ ...uderData, socketId })
}
const getUser = (userId) => {
    return users.find(user => user?._id === userId)
}
const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

io.on('connection', (socket) => {
    socket.on('addUsers', uderData => {
        addUser(uderData, socket.id)
        io.emit('getUsers', users)
    })

    socket.on('sendMessage', data => {
        const user = getUser(data.receiverId)
        io.to(user?.socketId).emit('getMessage', data)
    })

    socket.on('disconnect', () => {
        removeUser(socket.id);
        io.emit('getUsers', users);
    })
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve('./client/build/index.html'))
})

server.listen(port, () => { console.log(`server is running on port ${port}`) })
