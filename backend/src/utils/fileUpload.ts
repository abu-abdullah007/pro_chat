import { Request } from 'express'
import multer from 'multer'

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, 'uploads/')
    },
    filename(req, file, callback) {
        callback(null, `${Date.now()}${file.originalname}`)
    },
})

export const fileFilter = (request: Request, file: Express.Multer.File, callback: any) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        callback(null, true)
    } else {
        callback(new Error('Invalid File Type'), false)
    }
}


export default storage;