"use strict";
const fs = require('fs');
const config = require('../config');

exports.getIndexPictures = (req, res, next)=>{
    var fileArr = [];
    var filePath = './public/media/home/';
    fs.readdir(filePath, (err,files)=>{
        files.forEach(file=>{
            fileArr.push({name: "/media/home/" + file});
        });
        res.locals.indexPics = fileArr;
        next();
    });
};