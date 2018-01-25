"use strict"

const request = require('request');
const config = require('../config');

exports.getClan = (req, res, next)=>{
    var clanTag = req.params.tag;
    var options = {
        url: config.host + '/clan/' + clanTag,
        headers: {
            auth: config.authKey
        }
    };
    request(options, (error, response, body)=>{
        if(error){
            throw new Error('failed to retrieve data, API must be down');
        }
        else if(!error && (response.statusCode === 200 || response.statusCode === 304)){
            res.json(JSON.parse(body));
        }
        else{
            res.json(JSON.parse(body));
        }
    });
};

exports.getPlayer = (req, res, next)=>{
    var playerTag = req.params.tag;
    var options = {
        url: config.host + '/player/' + playerTag + '?exclude=battles,achievements,cards,chestCycle',
        headers: {
            auth: config.authKey
        }
    };
    request(options, (error, response, body)=>{
        if(error){
            throw new Error('failed to retrieve data, API must be down');
        }
        else if(!error && (response.statusCode === 200 || response.statusCode === 304)){
            //res.json(JSON.parse(body));
            res.locals.player = JSON.parse(body);
            next();
        }
        else{
            //res.json(JSON.parse(body));
            res.json(JSON.parse(body));
            next();
        }
    });
};

exports.getClanHistory = (req, res, next)=>{
    var clanTag = req.params.tag;
    var options = {
        url: config.host + '/clan/' + clanTag + '/history',
        headers: {
            auth: config.authKey
        }
    };
    request(options, (error, response, body)=>{
        if(error){
            throw new Error('failed to retrieve data, API must be down');
        }
        else if(!error && (response.statusCode === 200 || response.statusCode === 304)){
            res.json(JSON.parse(body));
        }
        else{
            res.json(JSON.parse(body));
        }
    });
};

exports.getNormiesMembers = (req, res, next)=>{
    const options = {
        url: config.host + '/clan/' + config.normiesTag,
        headers: {
            auth: config.authKey
        }
    };
    request(options, (error, response, body)=>{
        if(error){
            throw new Error('failed to retrieve data. API must be down');
        }
        else if(!error && (response.statusCode === 200 || response.statusCode === 304)){
            var clanData = JSON.parse(body);
            res.locals.normies = clanData.members;
            next();
        }
    });
};