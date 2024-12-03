import { Server, Socket } from 'socket.io'
import { socketAuthCheck } from './socketMiddleware/authCheckMiddleware'
import prisma from '../db/prismaConfig'

const setupSocket = (io: Server) => {
    io.use(socketAuthCheck)
    io.on('connection', async (socket: Socket) => {
        console.log('a user connected...')

        const { id } = socket.handshake.query
        try {
            const findUser = await prisma.profile.findUnique({
                where: {
                    userID: parseInt(id as string)
                }
            })
            if (findUser?.active === false) {
                await prisma.profile.update({
                    where: {
                        userID: parseInt(id as string)
                    },
                    data: {
                        active: true
                    }
                })
            }





            socket.on('disconnect', async () => {
                const findUser = await prisma.profile.findUnique({
                    where: {
                        userID: parseInt(id as string)
                    }
                })

                if (findUser?.active === true) {
                    await prisma.profile.update({
                        where: {
                            userID: parseInt(id as string)
                        },
                        data: {
                            active: false
                        }
                    })
                }
            })

        } catch (error) {
            throw new Error('User Active Setting Faild')
        }
    })
}

export default setupSocket;