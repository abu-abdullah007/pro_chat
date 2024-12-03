import { Socket } from "socket.io";
import prisma from "../../db/prismaConfig";

export async function getActiveUsers(socket: Socket) {
    const activeUsers = await prisma.profile.findMany({
        include:{
            author:{
                select:{
                    firstname:true,
                    lastname:true,
                    email:true,
                    username:true,
                    profile:true
                }
            }
        }
    })

    for (let i = 0; i < activeUsers.length; i++) {
        if (activeUsers[i].active === true) {
            socket.emit('get-users', activeUsers)
        }
    }
}