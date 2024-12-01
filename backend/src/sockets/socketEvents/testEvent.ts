import { Socket } from "socket.io";

export const testEvent = (socket: Socket) => {
    socket.on('get-message', data => {
        console.log(data)
    })
}