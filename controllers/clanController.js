"use strict"

const request = require('request');
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
        res.locals.clan = response.data;
        next();
    })
    .catch(error=>{
        console.log(error.response.status);
        console.log(error.response.statusText);
        console.log(error.response.body);
        next();
        /*TODO: error handling*/
    });
};

exports.getPlayer = (req, res, next)=>{
    var playerTag = req.params.tag;
    axios.get(config.host + '/player/' + playerTag, configuration)
    .then(response=>{
        res.locals.player = response.data;
        next();
    })
    .catch(error=>{
        console.log(error.response.status);
        console.log(error.response.statusText);
        console.log(error.response.body);
        next();
        /*TODO: better error handling*/
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
        console.log(error.response.status);
        console.log(error.response.statusText);
        console.log(error.response.body);
        next();
    });
};

exports.getNormies = (req, res, next)=>{
    axios.get(config.host + '/clan/' + config.normiesTag, configuration)
    .then(response=>{
        res.locals.normies = response.data;
        next();
    })
    .catch(error=>{
        console.log(error.response.status);
        console.log(error.response.statusText);
        console.log(error.response.body);
        res.send(error.response.body);
        next();
        /*TODO: better error handling*/
    });
};