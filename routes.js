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
    pageRoutes.get('/', userController.checkLogin, filesController.getIndexPictures, clanController.getNormies, pageController.renderIndexPage);

    //normies clan page
    pageRoutes.get('/clan', userController.checkLogin, clanController.getNormies, pageController.renderClanPage);
    
    //clan page
    pageRoutes.get('/clan/:tag', userController.checkLogin, clanController.getClan, pageController.renderClanPage);

    //about page
    pageRoutes.get('/about', userController.checkLogin, pageController.renderAboutPage);

    //player info page
    pageRoutes.get('/player/:tag', userController.checkLogin, clanController.getPlayer, clanController.getPlayerBattles, clanController.getPlayerChests, pageController.renderPlayerPage);

    //search page
    pageRoutes.get('/search', userController.checkLogin, pageController.renderSearchPage);

    //login page
    pageRoutes.get('/login', userController.checkLogin, pageController.renderLoginPage);

    //registration page
    pageRoutes.get('/register', userController.checkLogin, pageController.renderRegisterPage);

    //messaging page
    pageRoutes.get('/chat', userController.loginRequired, chatController.getMessages, pageController.renderMessagingPage);

    //account information page
    pageRoutes.get('/account', userController.checkLogin, userController.loginRequired, pageController.renderAccountPage);
    
    //page router
    app.use('/', pageRoutes);
}