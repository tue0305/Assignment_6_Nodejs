<<<<<<< HEAD
const mailer = require("nodemailer");
const {
    EMAIL_HOST,
    EMAIL_SERVICE,
    EMAIL_PORT,
    EMAIL_USER,
    EMAIL_PASS,
} = require("../config/config");

const sendEmail = async (email, subject, resetLink) => {
=======
const mailer = require('nodemailer')
const { EMAIL_HOST, EMAIL_SERVICE, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = require('../config/config');

const sendEmail = async(email, subject, resetLink) => {
>>>>>>> b50b31156ce6df0550143136f2894f61debadf4d
    try {
        const transporter = mailer.createTransport({
            host: EMAIL_HOST,
            service: EMAIL_SERVICE,
            port: EMAIL_PORT,
            secure: true,
            auth: {
                user: EMAIL_USER,
<<<<<<< HEAD
                pass: EMAIL_PASS,
            },
        });
=======
                pass: EMAIL_PASS
            }

        })
>>>>>>> b50b31156ce6df0550143136f2894f61debadf4d

        await transporter.sendMail({
            from: EMAIL_USER,
            to: email,
            subject: subject,
<<<<<<< HEAD
            html: `<html lang="en-US">
=======
            html: 
           
                `<html lang="en-US">
>>>>>>> b50b31156ce6df0550143136f2894f61debadf4d
                
                <head>
                    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                    <title>Reset Password Email Template</title>
                    <meta name="description" content="Reset Password Email Template.">
                    <style type="text/css">
                        a:hover {text-decoration: underline !important;}
                    </style>
                </head>
                
                <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                   
                    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                        <tr>
                            <td>
                                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                    align="center" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                        <a href="#" title="logo" target="_blank">
                                            <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo">
                                        </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:0 35px;">
                                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                                            requested to reset your password</h1>
                                                        <span
                                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                                            We cannot simply send you your old password. A unique link to reset your
                                                            password has been generated for you. To reset your password, click the
                                                            following link and follow the instructions.
                                                        </p>
                                                            <a href= ${resetLink} 
                                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset Password</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                            </table>
                                        </td>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.nauanne.com</strong></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    
                </body>
                <script>
                
                </script>
                
                </html>`,
<<<<<<< HEAD
        });
        console.log(`Email send successfully!`);
=======
        })
        console.log(`Email send successfully!`)
>>>>>>> b50b31156ce6df0550143136f2894f61debadf4d
    } catch (error) {
        console.log(error, `Email sent failed: ${error.message}!`);
    }
};

module.exports = sendEmail;
