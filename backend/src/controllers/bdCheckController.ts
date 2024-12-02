import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import prisma from "../db/prismaConfig";
import dayjs from "dayjs";

const JWT_SECRET = process.env.JWT_SECRET as string

export async function loginController(request: Request, response: Response) {
    const { email, password } = request.body

    try {
        if (email && password) {
            const matchData = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (matchData) {
                const passVrfy = await bcrypt.compare(password, matchData.password)

                if (passVrfy) {
                    const token = jwt.sign({ id: matchData.id, email }, JWT_SECRET, { expiresIn: '1h' })
                    response.status(200).json({
                        message: "Login Sucessfuly",
                        status: 200,
                        success: true,
                        timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY'),
                        token
                    })
                } else {
                    response.status(400).json({
                        message: "Password Not Match !",
                        status: 400,
                        success: false,
                        timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY')
                    })
                }
            } else {
                response.status(400).json({
                    message: "User Not Found !",
                    status: 400,
                    success: false,
                    timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY')
                })
            }
        } else {
            response.status(400).json({
                message: "Bad Request ! Credentials Not found !",
                status: 400,
                success: false,
                timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY')
            })
        }
    } catch (error) {
        response.status(500).json({
            message: "Login Faild !",
            status: 500,
            success: false,
            timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY'),
            error
        })
    }
}