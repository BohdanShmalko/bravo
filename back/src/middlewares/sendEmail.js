require('dotenv').config()
const nodemailer = require('nodemailer');

module.exports = (req, res, next) => {
    const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    req.sendEmail = ({to, subject, text, html}) => transporter.sendMail({
        from: '<bshmalko97@gmail.com>',
        to, subject, text, html,
    });
    next();
}