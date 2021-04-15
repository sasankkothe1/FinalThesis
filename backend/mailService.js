const nodeMailer = require('nodemailer');

const sendTheMail = (firstName, recipient, subject, content) => {

    const transporter = nodeMailer.createTransport({
        service: "outlook",
        auth: {
            user: "pspliboperationsmanagement@outlook.com",
            pass: "psplib123$"
        }
    });

    const options = {
        from: "pspliboperationsmanagement@outlook.com",
        to: recipient,
        subject: subject,
        text: `${firstName} yayys....email works now. Hope you are doing great ${content}`
    };

    transporter.sendMail(options, (err, info) => {
        err ? console.log(err) : console.log("email sent succesfully");
        console.log(info.response);
    })

}

module.exports = { sendTheMail };