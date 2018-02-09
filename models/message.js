const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'   
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});



module.exports = mongoose.model('Message', MessageSchema);