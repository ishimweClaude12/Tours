const nodemailer = require('nodemailer');
 require('dotenv').config();

// const sendEmail = async options =>{
//     const transporter = nodemailer.createTransport({
//         host: process.env.EMAIL_HOST, 
//         port: process.env.EMAIL_PORT, 
//         auth: {
//             user: process.env.EMAIL_USERNAME, 
//             pass: process.env.EMAIL_PASSWORD
//         }
//     })



// const mailOptions = {
//     from : 'dpqb12haikuo <ishimweClaude test email', 
//     to: options.email, 
//     subject: options.subject, 
//     text: options.message
// }

// await transporter.sendEmail(mailOptions);

// };
const sendEmail = async options =>{
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dpqb12haikuo@gmail.com',
    pass: 'ewbaotllkorskfpj'
  }
});

const mailOptions = {
  from: 'dpqb12hakuo@gmail.com',
  to: options.to,
  subject: options.subject,
  text: options.message
// html: '<h1>Password Reset Request</h1>'
};
await transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
};
module.exports = sendEmail;
