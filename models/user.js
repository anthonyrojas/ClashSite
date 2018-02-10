"use strict";

var mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    playerTag: {
        type: String,
        required: true,
        unique: true  
    },
    username: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};


module.exports = mongoose.model('User', UserSchema);