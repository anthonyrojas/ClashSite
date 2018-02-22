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
    res.render(path.resolve('./public/views/index'), {leader: leaderMember, top: topEarner, pics: res.locals.indexPics });
};

/*render the clan page*/
exports.renderClanPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/clan'), {data: res.locals.clan});
};

/*render a player page*/
exports.renderPlayerPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/player'), {data: res.locals.player, battles: res.locals.playerBattles, chests: res.locals.playerChests});
};

/*render the about page*/
exports.renderAboutPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/about'), null);
};

/*render the search page*/
exports.renderSearchPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/search'), null);
}

//render the login page
exports.renderLoginPage = (req, res, next)=>{
    if(req.query.error){
        var authError = req.query.error;
        if(authError === 'auth'){
            res.render(path.resolve('./public/views/login'), {error: {message: 'Authentication failed. Invalid player tag or password'}});
        }else if(authError === 'login'){
            res.render(path.resolve('./public/views/login'), {error: {message: 'Authentication failed. Log in again. Your sign in token seems to be corrupted or is no longer valid.'}});
        }
    }else{
        res.render(path.resolve('./public/views/login'), {error: null});
    }
}

//render the register page
exports.renderRegisterPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/register'), null);
}

//render the messaging page
exports.renderMessagingPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/messages'), null);
}

//render the account page
exports.renderAccountPage = (req, res, next)=>{
    res.render(path.resolve('./public/views/account'), {user: res.locals.user});
};