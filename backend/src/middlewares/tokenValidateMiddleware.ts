import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'
import dayjs from "dayjs";

const JWT_SECRET = process.env.JWT_SECRET as string

export function checkOneTimeTokenMiddleware(request: Request, response: Response, next: NextFunction) {
    const token = request.headers['authorization']?.split(' ')[1]

    if (token) {
        try {
            const isValid = jwt.verify(token, JWT_SECRET) as JwtPayload

            if (isValid) {
                request.body.userId = isValid
                next()
            }
        } catch (error) {
            response.status(403).json({
                message: "Token Is Expired !",
                status: 403,
                succes: false,
                timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY'),
                error
            })
        }
    } else {
        response.status(500).json({
            message: "Token Validation Faild !",
            status: 500,
            succes: false,
            timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY')
        })
    }
}