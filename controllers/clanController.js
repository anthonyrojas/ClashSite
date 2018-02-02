"use strict"
const axios = require('axios');
const config = require('../config');

const configuration = {
    headers: {
        auth: config.authKey
    }
};

exports.getClan = (req, res, next)=>{
    var clanTag = req.params.tag;
    axios.get(config.host + '/clan/' + clanTag, configuration)
    .then(response => {
        if(response.data.name === null || response.data.name === ""){
            var err = new Error('Player information not found. Invalid tag.');
            err.status = 500;
            next(err);
        }
        res.locals.clan = response.data;
        next();
    })
    .catch(error=>{
        const errStatus = error.response.status;
        const errText = error.response.statusText;
        if(errStatus === 404 || errStatus === 400){
            var err = new Error('Clan information not found. Invalid tag.');
            err.status = 500;
            next(err);
        }
        else if(errStatus === 503){
            var err = new Error('The service for Clash Royale information is down. Unfortunately, most of this website is dependent on cr-api.com working properly. The information on this site will be back to normal as soon as cr-api.com is working again. Many apologies -- Sir Doge');
            err.status = 500;
            next(err);
        }
        else{
            var err = new Error(errText);
            err.status = 500;
            next(err);
        }
    });
};

exports.getPlayer = (req, res, next)=>{
    var playerTag = req.params.tag;
    axios.get(config.host + '/player/' + playerTag, configuration)
    .then(response=>{
        if(response.data.name === null || response.data.name === ""){
            var err = new Error('Player information not found. Invalid tag.');
            err.status = 500;
            next(err);
        }
        var battles = response.data.battles;
        battles.forEach(battle => {
            console.log(battle);
        });
        res.locals.player = response.data;
        next();
    })
    .catch(error=>{
        const errStatus = error.response.status;
        const errText = error.response.statusText;
        if(errStatus === 404 || errStatus === 400){
            var err = new Error('Player information not found. Invalid tag.');
            err.status = 500;
            next(err);
        }
        else if(errStatus === 503){
            var err = new Error('The service for Clash Royale information is down. Unfortunately, most of this website is dependent on cr-api.com working properly. The information on this site will be back to normal as soon as cr-api.com is working again. Many apologies -- Sir Doge');
            err.status = 500;
            next(err);
        }
        else{
            var err = new Error(errText);
            err.status = 500;
            next(err);
        }
    });
};

exports.getClanHistory = (req, res, next)=>{
    var clanTag = req.params.tag;
    axios.get(config.host + '/clan/' + clanTag + '/history', configuration)
    .then(response=>{
        res.locals.clanHistory = response.data;
        next();
    })
    .catch(error=>{
        const errStatus = error.response.status;
        const errText = error.response.statusText;
        if(errStatus === 400 || errStatus === 404){
            var err = new Error('Clan information not found. Invalid tag or the history of this clan is not being tracked.');
            err.status = 500;
            next(err);
        }
        else if(errStatus === 503){
            var err = new Error('The service for Clash Royale information is down. Unfortunately, most of this website is dependent on cr-api.com working properly. The information on this site will be back to normal as soon as cr-api.com is working again. Many apologies -- Sir Doge');
            err.status = 500;
            next(err);
        }
        else{
            var err = new Error(errText);
            err.status = 500;
            next(err);
        }
    });
};

exports.getNormies = (req, res, next)=>{
    axios.get(config.host + '/clan/' + config.normiesTag, configuration)
    .then(response=>{
        res.locals.clan = response.data;
        next();
    })
    .catch(error=>{
        const errStatus = error.response.status;
        const errText = error.response.statusText;
        if(errStatus === 400 || errStatus === 404){
            var err = new Error('Clan information not found. Invalid tag.');
            err.status = 500;
            next(err);
        }
        else if(errStatus === 503){
            var err = new Error('The service for Clash Royale information is down. Unfortunately, most of this website is dependent on cr-api.com working properly. The information on this site will be back to normal as soon as cr-api.com is working again. Many apologies -- Sir Doge');
            err.status = 500;
            next(err);
        }
        else{
            var err = new Error(errText);
            err.status = 500;
            next(err);
        }
    });
};