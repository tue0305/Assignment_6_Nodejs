const mailer = require('nodemailer')

const sendEmail = async(email, subject, text) => {
    try {
        const transporter = mailer.createTransport({
            host: process.env.EMAIL_HOST,
            service: process.env.SERVICE,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }

        })

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text 
        })
        console.log(`Email send successfully!`)
    } catch (error) {
        console.log(error,`Email sent failed: ${error.message}!`)       
    }
}

module.exports = sendEmail;