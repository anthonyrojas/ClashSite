"use strict"
const path = require('path');
const config = require('../config');

/*render the index page*/
exports.renderIndexPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/index'), {data: res.locals.clan});
};

/*render the clan page*/
exports.renderClanPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/clan'), {data: res.locals.clan});
};

/*render a player page*/
exports.renderPlayerPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/player'), {data: res.locals.player});
};

/*render the about page*/
exports.renderAboutPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/about'), null);
};