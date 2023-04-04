const transporter = require('./smtpMailer')
require('dotenv').config()

exports.sendMail = (data) => {
    return new Promise((resolve , reject) => {


        let mailOptions = {
            from: `<No-Reply@${process.env.SMTP_HOST}>`,
            to: data.email,
            subject: data.subject,
            text: data.message
        };
    
        transporter.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            } else {
                resolve('email sent' + info.response)
            }
            });
    })
    
}