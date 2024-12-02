import express, { Application, Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import 'dotenv/config'
import chatRoutes from './routes/roomCreateRoute'
import setupSocket from './sockets/rootSocket'
import apiKeyCheckMiddleware from './middlewares/apiKeyCheckMiddleware'

const PORT = process.env.PORT
const HOST = process.env.HOST
const app: Application = express()
const server = http.createServer(app)
app.use(apiKeyCheckMiddleware)
app.use('/uploads',express.static('uploads'))
const io = new Server(server, {
    cors: {
        origin: '*'
    }
})
setupSocket(io)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/create', chatRoutes)
app.get('/', (request: Request, response: Response) => {
    response.status(200).json({
        message: "Welcome To Chat App Backend",
        status: 200,
        success: true
    })
})

server.listen(PORT, () => {
    console.log(`Server Is Running On http://${HOST}:${PORT}`)
})