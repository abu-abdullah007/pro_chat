// import { NextFunction, Request, Response } from "express";
// import storage from "../utils/fileUpload";
// import { fileFilter } from "../utils/fileUpload";
// import multer from "multer";

// const upload = multer({
//     storage,
//     fileFilter,
//     limits: { fileSize: 5 * 1024 * 1024 }
// }).fields([{name:'profile'}])

// export function uploadFiles(request: Request, response: Response, next: NextFunction) {

//     console.log({ ...request.body })

//     try {
//         upload(request, response, (err) => {
//             if (!err) {
//                 console.log('Data received successfully')
//                 next()
//             } else {
//                 response.status(400).json({
//                     message: "Data Upload Failed!",
//                     status: 400,
//                     success: false,
//                     err: err.message
//                 })
//             }
//         })
//     } catch (error) {
//         response.status(500).json({
//             message: "An Error Occurred.",
//             status: 400,
//             success: false,
//             error
//         })
//     }
// }


import { NextFunction, Request, Response } from "express";
import multer from "multer";
import storage from "../utils/fileUpload"; // আপনার ফাইল আপলোড স্টোরেজ কনফিগারেশন
import { fileFilter } from "../utils/fileUpload"; // ফাইল ফিল্টার

export function uploadFiles(request: Request, response: Response, next: NextFunction) {
    try {
        // multer কনফিগারেশন
        const upload = multer({
            storage, // স্টোরেজ কনফিগারেশন
            fileFilter, // ফাইল ফিল্টার
            limits: { fileSize: 5 * 1024 * 1024 }, // ফাইল সাইজ সীমা 5MB
        }).single('profile'); // 'profile' ফিল্ডটি ফাইলের জন্য

        // ফাইল আপলোড প্রসেস
        upload(request, response, (err) => {
            if (err) {
                // যদি কোনো ত্রুটি হয়
                return response.status(400).json({
                    message: "File upload failed!",
                    status: 400,
                    success: false,
                    error: err.message
                });
            }

            // ফাইল আপলোড সফল হলে
            console.log('File uploaded successfully');

            // request.body এর অন্যান্য ডেটা রাখা
            const formData = {
                ...request.body, // অন্যান্য ফর্ম ডেটা
                file: request.file, // ফাইল ডেটা
            };

            // formData আপনার নতুন ডেটা, পরবর্তী মডিউল বা রাউটার ফাংশনে এটি পাঠাতে পারেন
            request.body = formData;  // পুনরায় body আপডেট করা
            next(); // পরবর্তী মেটাডেটার জন্য next() কল করুন
        });

    } catch (error) {
        // কোনো সার্ভার সাইড ত্রুটি হলে
        response.status(500).json({
            message: "An error occurred.",
            status: 500,
            success: false,
            error
        });
    }
}
