var express = require('express');
var request = require('request');
/*import controllers for messaging here*/

/*create authentication controls and middleware routes*/

module.exports = (app)=>{
    var pageRoutes = express.Router();
    var chatRoutes = express.Router();
    var apiRoutes = express.Router();

    /*GET clan*/
    apiRoutes.get('/clan/:tag', (req, res)=>{
        var playerTag = req.params.tag;
        res.send('Tada! player works');
    });

    apiRoutes.get('/clan/:tag', (req, res)=>{
        var clanTag = req.params.tag;
        res.send('Tada! clan works');
    });

    app.use('/api', apiRoutes);

    /*GET for serving up static pages*/
    /*index page*/
    app.get('/', (req, res)=>{
        res.sendFile('clan.html');
    });

    /*clan page*/
    app.get('/normies', (req, res)=>{
        res.sendFile('index.html');
    });
}