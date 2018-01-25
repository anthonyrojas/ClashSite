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

/*render the index page*/
exports.renderIndexPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/index'), null);
};

/*render the clan page*/
exports.renderClanPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/clan'), {data: res.locals.normies});
};

/*render a player page*/
exports.renderPlayerPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/player'), {data: res.locals.player});
};

/*render the about page*/
exports.renderAboutPage = (req, res, next)=>{
    res.sender(path.resolve('./public/views/about'), null);
};