import { NextFunction, Request, Response } from "express";
import 'dotenv/config'

const Api_Key = process.env.API_KEY

export default function apiKeyCheckMiddleware(request: Request,response: Response,next: NextFunction) {
        const API_KEY = request.headers['x-api-key']
        try {
            if(API_KEY && API_KEY === Api_Key){
                next()
            }else{
                response.status(401).json({
                    message:"Unotherized Access !",
                    status:401,
                    success:false
                })
            }
        } catch (error) {
            response.status(500).json({
                message:"Authorization Faild !",
                status:500,
                success:false
            })
        }
}