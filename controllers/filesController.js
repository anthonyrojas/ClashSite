"use strict"
const fs = require('fs');
const config = require('../config');

exports.getPictures = (req, res)=>{
    var fileArr = [];
    var filePath = './public' + req.path + '/';
    //var filePath = p.resolve(filePathStr) + '/';
    var filePathStr = '.' + req.path + '/';
    fs.readdir(filePath, (err,files)=>{
        files.forEach(file=>{
            fileArr.push({name: filePathStr + file});
        });
        res.json(fileArr);
    });
};