import { NextFunction, Request, Response } from "express";
import { generateOTP, sendOTPByEmail } from "../utils/emailTransporter";
import dayjs from "dayjs";
import prisma from "../db/prismaConfig";

export async function otpSendMidleware(request: Request, response: Response, next: NextFunction) {
    const { firstname, lastname, email } = request.body

    if (firstname && lastname && email) {
        try {
            const otp = generateOTP()
            await sendOTPByEmail(email, otp, firstname, lastname)
            await prisma.oTP.create({
                data: {
                    otp
                }
            })
            next()
        } catch (error) {
            response.status(500).json({
                message: "OTP Sending Faild !",
                status: 500,
                success: false,
                error,
                timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY')
            })
        }
    } else {
        response.status(400).json({
            message: "Bad Request ! Credentials Not Found !",
            status: 400,
            success: false,
            timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY')
        })
    }
}