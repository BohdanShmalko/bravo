require('dotenv').config()
const nodemailer = require('nodemailer');

module.exports = (req, res, next) => {
    let transporter = nodemailer.createTransport({
        service: 'hotmail',
        // port: 25,
        // secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
        // tls:{
        //   rejectUnauthorized:false
        // }
    });

    req.sendEmail = ({to, subject, text, html}) => transporter.sendMail({
        from: '<bshmalko97@gmail.com>',
        to, subject, text, html,
    });
    next();
}