'use strict';

const nodemailer = require('nodemailer');

exports.sendContactFormEmail = (req, res, next)=>{
    var email = req.body.email;
    var subject = req.body.subject;
    var emailMessage = req.body.emailMessage;
    if(!email){//no email
        res.status(400).json({message: 'You must enter your email.'});
    }
    if(!subject){//no subject  
        res.status(400).json({message: 'You must enter a subject.'});
    }
    if(!emailMessage){//no message
        res.status(400).json({message: 'You must enter a message.'});
    }
    var mailTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user: 'normies.site.dev01@gmail.com',
            pass: 'sirdoggy95'
        }
    });
    const content = `<h3>From: ${email}</h3><p class="lead">${emailMessage}</p>`;
    var mailOptions = {
        from: email,
        to: 'normies.site.dev01@gmail.com',
        subject: subject,
        html: content
    };
    mailTransport.sendMail(mailOptions, (error, response)=>{
        if(error){
            res.status(401).json({message: 'Error occurred, email not sent.'});
        }else{
            res.status(200).json({message: 'Email sent! Sir Doge will get back to you as soon as possible.'});
        }
    });
}