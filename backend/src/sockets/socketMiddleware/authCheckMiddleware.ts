import { Socket } from "socket.io";
import 'dotenv/config'
import prisma from "../../db/prismaConfig";

const API_KEY = process.env.API_KEY as string

export function socketAuthCheck(socket: Socket, next: (err?: Error) => void) {
    const token = API_KEY

    if (token) {
        if (token === API_KEY) {
            next()
        } else {
            next(new Error('API Key not match'));
        }
    }
}