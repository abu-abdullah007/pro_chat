import { NextFunction, Request, Response } from 'express'
import pino from 'pino'

const logger = pino(
    {
        level: 'info',
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'yyyy-mm-dd HH:MM:ss.l',
            }
        }
    }
)

export const Logger = (request: Request, response: Response, next: NextFunction) => {
    logger.info(`Request URL : ${request.originalUrl}`)
    logger.info(`Hostname : ${request.hostname}`)
    logger.info(`IP Address : ${request.ip}`)
    logger.info(`Request Method : ${request.method}`)
    next()
}