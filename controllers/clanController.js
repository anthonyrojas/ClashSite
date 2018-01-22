"use strict"

const request = require('request');
const config = require('../config');

exports.getClan = (req, res)=>{
    var clanTag = req.params.tag;
    var options = {
        url: config.host + '/clan/' + clanTag,
        headers: {
            auth: config.authKey
        }
    };
    request(options, (error, response, body)=>{
        if(error){
            res.json(JSON.parse(error));
        }
        else if(!error && response.statusCode == 200){
            res.json(JSON.parse(body));
        }
        else{
            res.json(JSON.parse(body));
        }
    });
};

exports.getPlayer = (req, res)=>{
    var playerTag = req.params.tag;
    var options = {
        url: config.host + '/player/' + playerTag + '?exclude=battles,achievements,cards',
        headers: {
            auth: config.authKey
        }
    };
    request(options, (error, response, body)=>{
        if(error){
            res.json(JSON.parse(error));
        }
        else if(!error && response.statusCode == 200){
            res.json(JSON.parse(body));
        }
        else{
            res.json(JSON.parse(body));
        }
    });
};

exports.getClanHistory = (req, res)=>{
    var clanTag = req.params.tag;
    var options = {
        url: config.host + '/clan/' + clanTag + '/history',
        headers: {
            auth: config.authKey
        }
    };
    request(options, (error, response, body)=>{
        if(error){
            res.json(JSON.parse(error));
        }
        else if(!error && response.statusCode == 200){
            res.json(JSON.parse(body));
        }
        else{
            res.json(JSON.parse(body));
        }
    });
};

exports.getClanMemberWithRole = (req, res)=>{
    var role = req.params.role;
    var clanTag = req.params.tag;
    var options = {
        url: config.host + '/clan/' + clanTag,
        headers: {
            auth: config.authKey
        }
    };
    request(options, (error, response, body)=>{
        if(error){
            res.json(JSON.parse(error));
        }
        else if(!error && (response.statusCode == 200 || response.statusCode == 304)){
            
        }
    });
};