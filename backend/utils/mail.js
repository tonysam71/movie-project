const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USERMAIL,
        pass: process.env.USERPASS
    }
})

let sendEmail = async (sendto, subject, text, html) => {
    await transporter.sendMail({
        form: process.env.USERMAIL,
        to: sendto,
        subject,
        text,
        html
    })
}

module.exports = { sendEmail }