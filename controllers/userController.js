"use strict"

const config = require('../config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var User = mongoose.model('User');

exports.register = (req, res, next)=>{
    var newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 24)
    newUser.save((err, user)=>{
        if(err){
            return res.status(400).send({
                message: err
            });
        }else{
            user.password = undefined;
            return res.json(user);
        }
    });
};

exports.signIn = (req, res, next)=>{
    User.findOne({
        email: req.body.email
    }, (err, user)=>{
        if(err) throw err;
        if(!user || !user.comparePassword(req.body.password)){
            return res.status(401).json({message: 'Authentication failed. Invalid username or password'});
        }
        return res.json({token: jwt.sign({email: user.email, playerTag: user.playerTag, _id: user._id}, config.secret)});
    });
};

exports.loginRequired = (req, res, next)=>{
    if(req.user){
        next();
    }
    else{
        return res.status(401).json({message: 'Unauthorized user!'});
    }
};

