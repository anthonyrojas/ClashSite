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
            return res.status(422).json({error: 'Failed to send message.'});
        }
        //var formattedDate = dateformat(mes.dateCreated, "mmm d, yyyy, h:MM TT");
        //return res.json(mes);
        res.status(200).json({message: mes.content, username: req.user.username, playerTag: req.user.playerTag, timestamp: mes.dateCreated});
    });
};

exports.getMessages = (req, res, next)=>{
    Message.find().populate('sender').exec((err, messages)=>{
        if(err){
            return res.status(422).json({error: 'Failed to retrieve messages.'});
        }else if(messages != null || messages != undefined){
            res.locals.messages = messages;
            next();
        }else{
            res.locals.messages = null;
            next();
        }
    });
    /*Message.find((err, messages)=>{
        if(err){
            return res.status(422).json({error: 'Failed to retrieve messages.'});
        }else if(messages != null || messages != undefined){
            res.locals.messages = messages;
            next(); 
        }else{
            res.locals.messages = null;
            next();
        }
        //return res.json(messsages);
    });*/
};