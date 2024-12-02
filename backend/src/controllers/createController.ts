import { Request, Response } from "express";
import prisma from "../db/prismaConfig";
import bcrypt from 'bcryptjs'
import { encrypt } from "../utils/crypto_ops";
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import dayjs from "dayjs";

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
                    success: false,
                    timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY')
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
                    roomID: newRoom.roomId,
                    timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY')
                })
            }

        } else {
            response.status(400).json({
                message: "Bad Request, Credentials Not Found",
                status: 400,
                success: false,
                timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY')
            })
        }
    } catch (error) {
        response.status(500).json({
            message: "Room Creation Faild",
            status: 500,
            success: false,
            timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY'),
            error
        })
    }
}


// create user for room --------------------------------------------------

export async function createUserController(request: Request, response: Response) {
    const { firstname, lastname, username, email, password } = request.body

    try {
        if (firstname && lastname && username && email && password) {
            const findUser = await prisma.user.findUnique({
                where: { email }
            });

            if (findUser) {
                response.status(409).json({
                    message: "User Already Exists!",
                    status: 409,
                    success: false,
                    timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY')
                });
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashPass = await bcrypt.hash(password, salt);

                const newUser = await prisma.user.create({
                    data: {
                        firstname: firstname,
                        lastname: lastname,
                        username: username,
                        email: email,
                        password: hashPass
                    }
                });

                const token = jwt.sign({ id: newUser.id, username, email }, JWT_SECRET, { expiresIn: '1h' })

                response.status(201).json({
                    message: "New User Created Successfully",
                    status: 201,
                    success: true,
                    timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY'),
                    token
                });
            }
        } else {
            response.status(400).json({
                message: "Bad Request ! Credentials Not Found",
                status: 400,
                success: false,
                timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY')
            });
        }

    } catch (error) {
        response.status(500).json({
            message: "User Creation Failed!",
            status: 500,
            success: false,
            timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY'),
            error
        });
    }
}


// create profile controller --------------------------------------------------


export async function createProfileController(request: Request, response: Response) {
    const { location, education, phone, profileImage, userId, bio } = request.body
    const imageUrl = `${request.protocol}://${request.hostname}:${process.env.PORT}/${profileImage}`
    const authorId = parseInt(userId.id)
    console.log(request.body)

    try {
        if (location && education && phone && profileImage) {
            const createProfile = await prisma.profile.create({
                data: {
                    education,
                    location,
                    phone,
                    bio,
                    profileImage: imageUrl,
                    author: {
                        connect: {
                            id: authorId
                        }
                    }
                }
            })

            response.status(201).json({
                message: "Profile Created Successfuly",
                status: 201,
                success: true,
                timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY')
            })
        } else {
            response.status(400).json({
                message: "Bad Request ! Fields Are Empty",
                status: 400,
                success: false,
                timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY')
            })
        }
    } catch (error) {
        response.status(500).json({
            message: "Profile Creation Faild",
            status: 500,
            success: false,
            timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY'),
            error
        })
    }
}