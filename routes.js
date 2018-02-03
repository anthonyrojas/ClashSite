const express = require('express');
const path = require('path');
const config = require('./config');
const apicache = require('apicache');


/*import controllers*/
const pageController = require('./controllers/pageController');
const clanController = require('./controllers/clanController');
const filesController = require('./controllers/filesController');

/*TODO: create authentication controls/routes for registration and logging in*/

module.exports = (app)=>{
    var pageRoutes = express.Router();
    var chatRoutes = express.Router();
    var apiRoutes = express.Router();
    var fileRoutes = express.Router();

    let cache = apicache.middleware;
    /*routes for serving data from cr-api.com*/
    /*GET player*/
    //apiRoutes.get('/player/:tag', clanController.getPlayer);

    /*GET clan*/
    //apiRoutes.get('/clan/:tag', clanController.getClan);

    /*GET clan history*/
    //apiRoutes.get('/clan/history/:tag', clanController.getClanHistory);

    //app.use('/api', apiRoutes);

    /*routes for serving files (pictures, etc.)*/
    /*GET pictures in media/home folder*/
    fileRoutes.get('/media/home', filesController.getPictures);

    app.use('/files', fileRoutes);

    /*routes for serving static pages*/
    /*index page*/
    pageRoutes.get('/', cache('2 minutes'), clanController.getNormies, pageController.renderIndexPage);

    /*normies clan page*/
    pageRoutes.get('/clan', cache('2 minutes'), clanController.getNormies, pageController.renderClanPage);
    
    /*clan page*/
    pageRoutes.get('/clan/:tag', cache('2 minutes'), clanController.getClan, pageController.renderClanPage);

    /*about page*/
    pageRoutes.get('/about', pageController.renderAboutPage);

    /*player info page*/
    pageRoutes.get('/player/:tag', cache('2 minutes'), clanController.getPlayer, pageController.renderPlayerPage);

    /*search page*/
    pageRoutes.get('/search', cache('2 minutes'), pageController.renderSearchPage);
    
    /*page router*/
    app.use('/', pageRoutes);
}