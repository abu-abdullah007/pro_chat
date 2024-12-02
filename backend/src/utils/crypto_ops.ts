import crypto from 'crypto-js'

export const encrypt = (data: string, secret: string) => {
    return crypto.AES.encrypt(data, secret).toString();
}

export const decrypt = (data: string, secret: string) => {
    const bytes = crypto.AES.decrypt(data, secret);
    return bytes.toString(crypto.enc.Utf8)
}