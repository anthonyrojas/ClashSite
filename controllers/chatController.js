"use strict";

const mongoose = require('mongoose');
const dateformat = require('dateformat');
const Message = require('../models/message');
const User = require('../models/user');

exports.sendMessage = (req, res, next)=>{
    var newMessage = new Message({
        content: req.body.content,
        sender: req.user._id
    });
    //var newMessage = new Message(req.body);
    newMessage.save((err, mes)=>{
        if(err){
            res.status(422).json({error: 'Failed to send message.'});
        }
        var formattedDate = dateformat(mes.dateCreated, "mmm d, yyyy, h:MM TT");
        //return res.json(mes);
        res.json({message: mes.content, username: req.user.username, playerTag: req.user.playerTag, timestamp: formattedDate});
    });
};

exports.getMessages = (req, res, next)=>{
    Message.find((err, messsages)=>{
        if(err){
            res.status(422).json({error: 'Failed to retrieve messages.'});
        }
        res.json(messsages);
    });
};