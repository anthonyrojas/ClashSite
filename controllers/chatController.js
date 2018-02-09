"use strict";

const mongoose = require('mongoose');
const message = require('../models/message');

exports.sendMessage = (req, res, next)=>{
    var newMessage = new message(req.body);
    //newMessage.sender = req.user;
    newMessage.save((err, mes)=>{
        if(err){
            res.status(422).json({error: 'Failed to send message.'});
        }
        res.json(mes);
    });
};

exports.getMessages = (req, res, next)=>{
    message.find((err, messsages)=>{
        if(err){
            res.status(422).json({error: 'Failed to retrieve messages.'});
        }
        res.json(messsages);
    });
};