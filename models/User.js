const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {type: String,  required: true},
    lastName : {type: String,  required: true},
    emailAddres: {type: String,  required: true},
    password : {type: String, required: true },
    createdDate : { type: Date, default: new Date()}
})

module.exports = mongoose.model('user', UserSchema)