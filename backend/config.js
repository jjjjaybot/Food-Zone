import dotenv from 'dotenv';

dotenv.config();

export default {
    accessKeyId: process.env.accessKeyId || 'accessKeyId',
    secretAccessKey: process.env.secretAccessKey || 'secretkey'
}