var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var MUNUser = mongoose.model('munUser', new Schema({
    id: ObjectId,
    role: String,
    level: Number,
    name: {type: String, unique: true},
    userName: {type: String, unique: true},
    password: String
}));

module.exports = MUNUser;