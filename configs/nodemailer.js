require('dotenv').config();
const nodemailer = require('nodemailer');

//TODO: Esto es necesario?
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: `${process.env.GOOGLE_USER}`,
        pass: `${process.env.GOOGLE_PASS}`
    }
});

module.exports = transporter;