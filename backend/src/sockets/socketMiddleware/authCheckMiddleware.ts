import { Socket } from "socket.io";

export default function socketAuthCheck(socket: Socket, next: (err?: Error) => void) {
    const token = socket.handshake.auth
    console.log(token)
    next()
}