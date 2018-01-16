const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const multer = require('multer');
const upload = multer();
const routes = require('./routes');
const path = require('path');

var config = require('./config');

const host = 'http://api.cr-api.com';
const authKey = '7fb6ace9f3b44d029912a732da4984aae1f7d285ae03498497592b1a3120d234';

/*start express server*/
app.listen(config.port, ()=>{
    console.log("Sever is up on port " + config.port);
});

/*Visibility to client for public folder items*/
app.use(express.static(path.join(__dirname, '/public')));
//app.use(express.static('public'));
//app.use(express.static(__dirname + '/public'));

/*Setting up middleware*/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(multer()); //for uploading files, will include in a future version

/*Enable CORS from client-side*/
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//routes(app);

app.get('/', (req, res)=>{
    res.sendFile('index.html');
});

app.get('/clan', (req, res)=>{
    res.sendFile('clan.html');
});
