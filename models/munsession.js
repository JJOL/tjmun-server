var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var MUNSession = mongoose.model('session', new Schema({
    id: ObjectId,
    committeeName: String,
    protocol: String,
    state: String,
    moderators: Array,
    delegates: Array,
    warnings: Array
}));

module.exports = MUNSession;