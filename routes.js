const express = require('express');
const path = require('path');
const config = require('./config');
const apicache = require('apicache');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

/*import controllers*/
const pageController = require('./controllers/pageController');
const clanController = require('./controllers/clanController');
const filesController = require('./controllers/filesController');

/*TODO: create authentication controls/routes for registration and logging in*/
const userController = require('./controllers/userController');
const chatController = require('./controllers/chatController');

/*import models*/
const user = require('./models/user');

module.exports = (app)=>{
    var pageRoutes = express.Router();
    var chatRoutes = express.Router();
    var apiRoutes = express.Router();

    let cache = apicache.middleware;

    //api routes for user authentication and login
    //TODO: logout route
    apiRoutes.post('/register', userController.register);

    apiRoutes.post('/login', userController.signIn);

    app.use('/api', apiRoutes);

    //chat routes
    chatRoutes.use((req, res, next)=>{
        if(req.headers && req.headers.authorization){
            jwt.verify(req.headers.authorization, config.secret, function(err, decode){
                if(err) req.user = undefined;
                req.user = decode;
                next();
            });
        }else{
            req.user = undefined;
            next();
        }
    });

    chatRoutes.get('/messages', userController.loginRequired, chatController.getMessages);

    chatRoutes.post('/send', userController.loginRequired, chatController.sendMessage);

    app.use('/api/chat', chatRoutes);
    
    //routes for serving static pages
    //index page
    pageRoutes.get('/', cache('2 minutes'), filesController.getIndexPictures, clanController.getNormies, pageController.renderIndexPage);

    //normies clan page
    pageRoutes.get('/clan', cache('2 minutes'), clanController.getNormies, pageController.renderClanPage);
    
    //clan page
    pageRoutes.get('/clan/:tag', cache('2 minutes'), clanController.getClan, pageController.renderClanPage);

    //about page
    pageRoutes.get('/about', pageController.renderAboutPage);

    //player info page
    pageRoutes.get('/player/:tag', cache('2 minutes'), clanController.getPlayer, clanController.getPlayerBattles, clanController.getPlayerChests, pageController.renderPlayerPage);

    //search page
    pageRoutes.get('/search', cache('2 minutes'), pageController.renderSearchPage);

    //login page
    pageRoutes.get('/login', pageController.renderLoginPage);

    //registration page
    pageRoutes.get('/register', pageController.renderRegisterPage);

    //messaging page
    pageRoutes.get('/messaging', userController.loginRequired, pageController.renderMessagingPage);

    pageRoutes.get('/account', userController.loginRequired, pageController.renderAccountPage);
    
    //page router
    app.use('/', pageRoutes);
}