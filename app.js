const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const multer = require('multer');
const mongoose = require('mongoose');
const upload = multer();
const routes = require('./routes');
const path = require('path');
const socketEvents = require('./socketEvents');

var config = require('./config');

/*visibility to client for public folder items and serving them*/
app.use(express.static(path.join(__dirname, '/public')));

/*set and enable ejs as view engine*/
app.set('view engine', 'ejs');

/*connect to the database*/
//mongoose.Promise = global.Promise;
//mongoose.connect(config.database, {useMongoClient: true});

/*Setting up middleware*/
if(process.env.NODE_ENV === 'production'){
    app.use(logger('combined'));
}else{
    app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(multer()); //for uploading files, will include in a future version

/*Enable CORS from client-side*/
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

/*start express server*/
const server = app.listen(config.port, ()=>{
    console.log("Server is running on port " + config.port);
});

/*connect socket io to server*/
//const io = require('socket.io').listen(server);
//socketEvents(io);

/*load routes*/
routes(app);

/*error middleware*/
app.get('*', function(req, res, next) {
    var err = new Error('Invalid path. Page not found.');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    res.status(err.status);
    res.render(path.resolve('./public/views/error'), {status: err.status, message: err.message});
});