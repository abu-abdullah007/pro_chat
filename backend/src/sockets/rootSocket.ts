import { Server, Socket } from 'socket.io'
import socketAuthCheck from './socketMiddleware/authCheckMiddleware'

const setupSocket = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('a user connected...')
    })
}

export default setupSocket;