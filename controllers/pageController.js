"use strict"
const path = require('path');
const config = require('../config');

exports.getIndexPage = (req, res, next)=>{
    res.sendFile(path.resolve('./public/index.html'));
};

exports.getClanPage = (req, res, next)=>{
    res.sendFile(path.resolve('./public/clan.html'));
};

exports.getAboutPage = (req, res, next)=>{
    res.sendFile(path.resolve('./public/about.html'));
};

exports.getPlayerPage = (req, res, next)=>{
    res.sendFile(path.resolve('./public/player.html'));
};

exports.renderIndexPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/index'), null);
};

exports.renderClanPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/clan'), {data: res.locals.normies});
};

exports.renderPlayerPage = (req, res, next)=>{
    var playerInfo = {
        data: res.locals.player
    };
    res.render(path.resolve('./public/views/player'), playerInfo);
};