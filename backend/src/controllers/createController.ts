import { Request, Response } from "express";
import prisma from "../db/prismaConfig";
import bcrypt from 'bcryptjs'
import { encrypt } from "../utils/crypto_ops";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const secret = process.env.CRYPTO_SECRET as string
const JWT_SECRET = process.env.JWT_SECRET as string

export async function createRoomController(request: Request, response: Response) {
    const { roomId, roomPass } = request.body

    try {
        if (roomId && roomPass) {
            const findRoom = await prisma.room.findUnique({
                where: {
                    roomId
                }
            })
            if (findRoom) {
                response.status(409).json({
                    message: "Room Allready Exist !",
                    status: 409,
                    success: false
                })
            } else {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(roomPass, salt)

                const newRoom = await prisma.room.create({
                    data: {
                        roomId: encrypt(roomId, secret),
                        roomPass: hashedPassword
                    }
                })

                response.status(201).json({
                    message: "Room Created Successfuly",
                    status: 201,
                    success: true,
                    roomID: newRoom.roomId
                })
            }

        } else {
            response.status(400).json({
                message: "Bad Request, Credentials Not Found",
                status: 400,
                success: false
            })
        }
    } catch (error) {
        response.status(500).json({
            message: "Room Creation Faild",
            status: 500,
            success: false,
            error
        })
    }
}


// create user for room --------------------------------------------------

export async function createUserController(request: Request, response: Response) {
    try {
        const formData = request.body;
        const { username, email, password } = formData;
        console.log(request.file)
        console.log({
            username,
            email,
            password
        })
        // if (username && email && password) {
        //     const findUser = await prisma.user.findUnique({
        //         where: { email }
        //     });

        //     if (findUser) {
        //         response.status(409).json({
        //             message: "User Already Exists!",
        //             status: 409,
        //             success: false
        //         });
        //     } else {
        //         const salt = await bcrypt.genSalt(10);
        //         const hashPass = await bcrypt.hash(password, salt);

        //         const newUser = await prisma.user.create({
        //             data: {
        //                 username: encrypt(username, secret),
        //                 email: encrypt(email, secret),
        //                 password: hashPass,
        //                 profile: formData.profile || '',
        //             }
        //         });

        //         const token = jwt.sign({ username, email }, JWT_SECRET, { expiresIn: '1h' });

        //         response.status(201).json({
        //             message: "New User Created Successfully",
        //             status: 201,
        //             success: true,
        //             token
        //         });
        //     }
        // }

    } catch (error) {
        response.status(500).json({
            message: "User Creation Failed!",
            status: 500,
            success: false,
            error
        });
    }
}