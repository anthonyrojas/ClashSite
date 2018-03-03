"use strict"
const path = require('path');
const config = require('../config');

/*render the index page*/
exports.renderIndexPage = (req, res, next)=>{
    var leaderMember;
    const members = res.locals.clan.members;
    members.forEach(member => {
        if(member.role === 'leader'){
            leaderMember = member;
        }    
    });
    var clanMax = 0;
    var topEarner;
    members.forEach(member => {
        if(member.clanChestCrowns > clanMax){
            clanMax = member.clanChestCrowns;
            topEarner = member;
        }
    });
    res.render(path.resolve('./public/views/index'), {leader: leaderMember, top: topEarner, pics: res.locals.indexPics, loggedIn: res.locals.isAuth });
};

/*render the clan page*/
exports.renderClanPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/clan'), {data: res.locals.clan, loggedIn: res.locals.isAuth});
};

/*render a player page*/
exports.renderPlayerPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/player'), {data: res.locals.player, battles: res.locals.playerBattles, chests: res.locals.playerChests, loggedIn: res.locals.isAuth});
};

/*render the about page*/
exports.renderAboutPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/about'), {loggedIn: res.locals.isAuth});
};

/*render the search page*/
exports.renderSearchPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/search'), {loggedIn: res.locals.isAuth});
}

//render the login page
exports.renderLoginPage = (req, res, next)=>{
    if(req.query.error){
        var authError = req.query.error;
        if(authError === 'auth'){
            res.render(path.resolve('./public/views/login'), {error: {message: 'Authentication failed. Invalid player tag or password'}, success: null, loggedIn: res.locals.isAuth});
        }else{
            res.render(path.resolve('./public/views/login'), {error: {message: 'Authentication failed. Log in again. Your sign in token seems to be corrupted or is no longer valid.'}, success: null, loggedIn: res.locals.isAuth});
        }
    }else if(req.query.register === 'success'){
        res.render(path.resolve('./public/views/login'), {error: null, success: {message: 'Congratulations! Your registration was successful! Please sign in.'}, loggedIn: res.locals.isAuth});
    }else if(res.locals.isAuth == true){
        res.redirect('/account');
    }else{
        res.render(path.resolve('./public/views/login'), {error: null, success: null, loggedIn: res.locals.isAuth});
    }
}

//render the register page
exports.renderRegisterPage = (req, res, next)=>{
    if(req.query.tag || req.query.email || req.query.password){
        var errorData = {
            tagErr: req.query.tag,
            emailErr: req.query.email,
            passwordErr: req.query.password
        };
        res.render(path.resolve('./public/views/register'), {error: errorData, loggedIn: res.locals.isAuth});
    }else{
        var errorData = {
            tagErr: null,
            emailErr: null,
            passwordErr: null
        };
        if(res.locals.isAuth == true){
            res.redirect('/account');
        }else{
            res.render(path.resolve('./public/views/register'), {error: errorData, loggedIn: res.locals.isAuth});
        }
    }
}

//render the messaging page
exports.renderMessagingPage = function(req, res, next){
    res.render(path.resolve('./public/views/messages'), {messages: res.locals.messages});
}

//render the account page
exports.renderAccountPage = (req, res, next)=>{
    //console.log(user);
    res.render(path.resolve('./public/views/account'), {user: req.user, loggedIn: res.locals.isAuth});
};