import express, { Application, Request, Response } from 'express'
import http from 'http'
import { Server } from 'socket.io'
import 'dotenv/config'
import setupSocket from './sockets/rootSocket'

const PORT = process.env.PORT
const HOST = process.env.HOST
const app: Application = express()
const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:'*'
    }
})
setupSocket(io)


app.get('/', (request: Request, response: Response) => {
    response.setHeader('Access-Control-Allow-Origin', '*')
    response.status(200).json({
        message: "Welcome To Chat App Backend",
        status: 200,
        success: true
    })
})

server.listen(PORT, () => {
    console.log(`Server Is Running On http://${HOST}:${PORT}`)
})