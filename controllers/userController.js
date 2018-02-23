"use strict";

const axios = require('axios');
const config = require('../config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

const crapiConfig = {
    headers: {
        auth: config.authKey
    }
};

exports.register = (req, res, next)=>{
    const emailEntry = req.body.email;
    const passwordEntry = req.body.password;
    const playerTagEntry = req.body.playerTag;

    var errString = '';
    //TODO: make an error var to collect error messages and display it back to the user as a url query string
    if(!emailEntry){
        //return res.status(422).send({error: 'You must enter an email.'});
        errString = errString + 'email=err';
    }
    if(!passwordEntry){
        //return res.status(422).send({error: 'You must enter a password.'});
        if(errString == ''){
            errString = errString + 'password=err';
        }else{
            errString = errString + '&password=err';
        }
    }
    if(!playerTagEntry){
        //return res.status(422).send({error: 'You must enter a player tag.'});
        if(errString == ''){
            errString = errString + 'tag=err';
        }else{
            errString = errString + '&tag=err';
        }
    }

    if(errString != ''){
        return res.redirect('/register?' + errString);
    }
    //check if a user with the player tag exists
    User.findOne({playerTag: playerTagEntry}, (err, existingUser)=>{
        if(err){
            return res.status(500).send({error: 'Error connecting to the database.'});
        }
        //return error if user exists
        if(existingUser){
            return res.redirect('/register?tag=takenErr');
            //return res.status(422).send({error: 'The player tag you have entered is already in use.'});
        }
        //obtain the user name for the new user if the player tag does not exist
        axios.get(config.host + '/player/' + playerTagEntry, crapiConfig)
        .then(response=>{
            const usernameEntry = response.data.name;
            if(usernameEntry === null || usernameEntry === "" || usernameEntry == undefined ){
                return res.redirect('/register?tag=err');
                //return res.status(422).send({error: 'Player information not found. Invalid tag.'});
            }
            //create and save the user if it does not exist
            const salt = bcrypt.genSaltSync(10);//generate salt with factor 10
            const hashPassword = bcrypt.hashSync(passwordEntry, salt);//hash the password
            var newUser = new User({
                email: emailEntry,
                password: hashPassword,
                playerTag: playerTagEntry,
                username: usernameEntry
            });
            //save the new user in the database
            newUser.save((err, user)=>{
                if(err){
                    return res.status(400).send({
                        message: err
                    });
                }else{
                    user.password = undefined;
                    return res.redirect('/login?register=success');
                    //res.json(user);
                }
            });
        })
        .catch(error=>{
            const errStatus = error.response.status;
            if(errStatus === 404 || errStatus === 400){
                return res.redirect('/register?tag=err');
                //return res.status(422).send({error: 'Player information not found. Invalid tag. Input a valid player tag.'});
            }
            else if(errStatus === 503){
                return res.status(422).send({error: 'The service from which we draw data is currently down. Please try to register again later.'});
            }
            else if(errStatus === 429){
                return res.status(422).send({error: 'Cr-api.com has throttled the amount of requests that can be made per 2 minutes. Seems the limit has been exceeded. Please wait for the cooldown and you may complete registration shortly.'});
            }
            else{
                return res.status(422).send({error: 'Player information not found or could not be obtained. Input a valid player tag.'});
            }
        });
    });
};

exports.signIn = (req, res, next)=>{
    User.findOne({
        playerTag: req.body.playerTag
    }, (err, user)=>{
        if(err){
            res.status(500).json({error: 'Error connecting to database. Could not sign in at this time.'});
        }
        if(!user || !user.comparePassword(req.body.password)){
            res.redirect('/login?error=auth');
            //res.status(401).json({error: 'Authentication failed. Invalid player tag or password'});
        }
        else{
            //jwt is signed so that the token expires in 24 hours, at which point the user will have to sign in again
            //return res.json({token: jwt.sign({email: user.email, playerTag: user.playerTag, username: user.username, _id: user._id}, config.secret, {expiresIn: 86400})});
        
            //for dev and testing:
            if(process.env.NODE_ENV === 'production'){
                //for production:
                res.cookie('Authorization', jwt.sign({email: user.email, playerTag: user.playerTag, username: user.username, _id: user._id}, config.secret), {secure: true});
                res.redirect('/account');
            }else{
                res.cookie('Authorization', jwt.sign({email: user.email, playerTag: user.playerTag, username: user.username, _id: user._id}, config.secret), {httpOnly: true});
                res.redirect('/account');
            }
        }
    });
};

exports.userInfo = (req, res, next)=>{
    User.findOne({
        _id: req.user._id
    }, (err, user)=>{
        if(err){
            res.status(401).json({error: 'Error connecting to database.'});
        }
        if(!user){
            //return res.status(402).json({error: 'User not found. Sign in again'});
            res.redirect('/login?error=login');
        }else{
            res.locals.user = user;
            next();
        }
    });
};

exports.loginRequired = (req, res, next)=>{
    const authCookie = req.cookies['Authorization'];
    jwt.verify(authCookie, config.secret, (err, decoded)=>{
        if(err){
            return res.status(401).json({message: 'Unauthorized user!'});
        }else{
            req.user = decoded;
            if(req.user){
                next();
            }
            else{
                return res.redirect('/login?error=login');
                //return res.status(401).json({message: 'Unauthorized user!'});
            }
        }
    });
};

exports.checkLogin = (req, res, next)=>{
    const authCookie = req.cookies['Authorization'];
    jwt.verify(authCookie, config.secret, (err, decoded)=>{
        //see if the user is signed in
        //this will be used to display different nav items, like messages ...but only when the user is signed in
    })
};