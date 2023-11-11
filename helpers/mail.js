const nodemailer = require('nodemailer');
const handlebars = require('handlebars');

const fs = require('fs');
const path = require('path');

let email_content = path.join(__dirname, "../public/email_content.hbs");
let content = fs.readFileSync(email_content, 'utf8').toString();


module.exports = {



    // Send email
    sendEmail: async (email, subject, body) => {
        return new Promise((resolve, reject) => {
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            let mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: subject,
                html: body,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log('Email sent : ' + info.response);
                    resolve(true);
                }
            });
        });
    },



    // Generate email body from content and data
    generateEmailBody: async (content, data) => {
        let template = handlebars.compile(content);
        let body = template(data);
        return body;
    },



    // Initiate email sending
    sendEmailToUser: async (email, subject, data) => {
        return new Promise(async (resolve, reject) => {

            await module.exports.generateEmailBody(content, data).then(async (body) => {

                await module.exports.sendEmail(email, subject, body).then((result) => {
                    resolve(result);
                }).catch((error) => {
                    reject(error);
                });

            }).catch((error) => {
                reject(error);
            });

        });
    },



};