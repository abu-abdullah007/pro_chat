import { Server, Socket } from 'socket.io'
import dayjs from 'dayjs'
import socketAuthCheck from './socketMiddleware/authCheckMiddleware'
import { testEvent } from './socketEvents/testEvent'

const setupSocket = (io: Server) => {
    io.use(socketAuthCheck)
    io.on('connection', (socket: Socket) => {
        console.log('a user connected...')
        testEvent(socket)
    })
}

export default setupSocket;