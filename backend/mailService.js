const nodeMailer = require('nodemailer');

const sendTheMail = (firstName, recipient, subject, content) => {

    const transporter = nodeMailer.createTransport({
        service: "outlook",
        secure: false,
        auth: {
            user: "pspliboperationsmanagement@outlook.com",
            pass: "psplib123$"
        }
    });

    const options = {
        from: "pspliboperationsmanagement@outlook.com",
        to: recipient,
        subject: subject,
        text: `Dear ${firstName},\n Hope you are doing great.\n ${content}`
    };

    transporter.sendMail(options, (err, info) => {
        err ? console.log(err) : console.log("email sent succesfully");
        console.log(info.response);
    })

}

module.exports = { sendTheMail };