"use strict";

const axios = require('axios');
const config = require('../config');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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

    if(!emailEntry){
        return res.status(422).send({error: 'You must enter an email.'});
    }
    if(!passwordEntry){
        return res.status(422).send({error: 'You must enter a password.'});
    }
    if(!playerTagEntry){
        return res.status(422).send({error: 'You must enter a player tag.'});
    }

    //check if a user with the player tag exists
    User.findOne({playerTagEntry}, (err, existingUser)=>{
        if(err){
            return res.status(500).send({error: 'Error connecting to the database.'});
        }
        //return error if user exists
        if(existingUser){
            return res.status(422).send({error: 'The player tag you have entered is already in use.'});
        }
        //obtain the user name for the new user if the player tag does not exist
        axios.get(config.host + '/player/' + playerTagEntry + '?keys=tag,name,clan', crapiConfig)
        .then(response=>{
            if(response.data.name === null || response.data.name === "" || response.data.name == undefined ){
                return res.status(422).send({error: 'Player information not found. Invalid tag.'});
            }
            const usernameEntry = response.data.name;
            //create and save the user if it does not exist
            var newUser = new User({
                email: emailEntry,
                password: bcrypt.hashSync(passwordEntry, 10),
                username: usernameEntry,
                playerTag: playerTagEntry
            });
            //console.log(newUser);
            //save the new user in the database
            newUser.save((err, user)=>{
                if(err){
                    return res.status(400).send({
                        message: err
                    });
                }else{
                    user.password = undefined;
                    res.json(user);
                }
            });
        })
        .catch(error=>{
            const errStatus = error.response.status;
            if(errStatus === 404 || errStatus === 400){
                return res.status(422).send({error: 'Player information not found. Invalid tag. Input a valid player tag.'});
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
            res.status(500).send({error: 'Error connecting to database. Could not sign in at this time.'});
        }
        if(!user || !user.comparePassword(req.body.password)){
            return res.status(401).json({message: 'Authentication failed. Invalid player tag or password'});
        }
        //jwt is signed so that the token expires in 24 hours, at which point the user will have to sign in again
        return res.json({token: jwt.sign({email: user.email, playerTag: user.playerTag, _id: user._id}, config.secret, {expiresIn: 86400})});
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