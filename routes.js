const express = require('express');
const request = require('request');
const path = require('path');
const config = require('./config');
/*import controllers for messaging here*/
const clanController = require('./controllers/clanController');
const filesController = require('./controllers/filesController');

/*TODO: create authentication controls and middleware routes*/

module.exports = (app)=>{
    var pageRoutes = express.Router();
    var chatRoutes = express.Router();
    var apiRoutes = express.Router();
    var fileRoutes = express.Router();

    /*routes for serving data from cr-api.com*/
    /*GET player*/
    apiRoutes.get('/player/:tag', clanController.getPlayer);

    /*GET clan*/
    apiRoutes.get('/clan/:tag', clanController.getClan);

    /*GET clan member with role*/
    apiRoutes.get('/clan/:tag/:role', clanController.getClanMemberWithRole);

    /*GET clan history*/
    apiRoutes.get('/clan/history/:tag', clanController.getClanHistory);

    app.use('/api', apiRoutes);

    /*routes for serving files (pictures, etc.)*/
    /*GET pictures in media/home folder*/
    fileRoutes.get('/media/home', filesController.getPictures);

    app.use('/files', fileRoutes);

    /*routes for serving static pages*/
    /*index page*/
    pageRoutes.get('/', (req, res)=>{
        res.sendFile(path.resolve('./public/index.html'));
    });

    /*clan page*/
    pageRoutes.get('/clan', (req, res)=>{
        res.sendFile(path.resolve('./public/clan.html'));
    });

    /*about page*/
    pageRoutes.get('/about', (req, res)=>{
        res.sendFile(path.resolve('./public/about.html'));
    });

    /*member info page*/
    pageRoutes.get('/member/:tag', (req, res)=>{
        res.sendFile(path.resolve('./public/member.html'));
    });

    /*page router*/
    app.use('/', pageRoutes);
}