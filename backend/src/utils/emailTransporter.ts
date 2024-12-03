import nodemailer from 'nodemailer'
import { randomBytes } from 'crypto'
import 'dotenv/config'

const EMAIL = process.env.EMAIL as string
const E_PASS = process.env.E_PASS as string

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: E_PASS
    }
})


export function generateOTP() {
    return randomBytes(3).toString('hex')
}


export function sendOTPByEmail(email: string, otp: string, firstname: string, lastname: string) {
    const mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Verify Your Account',
        text: `Hi ${firstname} ${lastname} ! This is chatting server, 
            </br> you are trying to signup on chat application,
            </br> Please verify your account by OTP, Your OTP is ${otp}`
    }

    return transporter.sendMail(mailOptions);
}