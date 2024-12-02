import multer from "multer";
import storage from "../utils/fileUpload";
import { fileFilter } from "../utils/fileUpload";
import { NextFunction, Request, Response } from "express";
import dayjs from "dayjs";

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
}).single('profile')


export function fileUploadHandleMiddleware(request: Request, response: Response, next: NextFunction) {
    const userId = request.body.userId
    try {
        upload(request, response, (err) => {
            if (err) {
                response.status(400).json({
                    message: "Bad Request ! File Upload Faild",
                    status: 400,
                    success: false,
                    timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY'),
                    err: err.message
                })
            }

            if (request.file) {
                request.body.profileImage = request.file.path;
            }

            if (userId) {
                request.body.userId = userId
            }

            next();
        });

    } catch (error) {
        response.status(400).json({
            message: "Bad Request ! File Upload Faild",
            status: 400,
            success: false,
            timestamp: dayjs().format('ss:mm:HH DD/MM/YYYY')
        })
    }
}
























// Initialize multer with proper configuration
// const upload = multer({
//     storage,
//     fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 }
// }).single('profile');

// export function fileUploadHandleMiddleware(request: Request, response: Response, next: NextFunction) {
//     try {
//         // Process multipart form data
//         upload(request, response, function(err) {
//             if (err) {
//                 return response.status(401).json({
//                     message: "An Error Occurred !",
//                     status: 401,
//                     success: false,
//                     err: err.message
//                 });
//             }

//             // Log the form data and file
//             console.log('Form Data:', request.body);
//             console.log('Uploaded File:', request.file);

//             // Add file info to the request body if a file was uploaded
//             if (request.file) {
//                 request.body.profileImage = request.file.path;
//             }

//             next();
//         });
//     } catch (error) {
//         response.status(500).json({
//             message: "File Upload Failed !",
//             status: 401,
//             success: false,
//             error
//         });
//     }
// }