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
    warnings: Array,
    events: Array
}));

module.exports = MUNSession;


/* Warning
{
    from,
    to,
    date,
    comment,
}


 * 5:00pm Session Started!
 * 5:50pm Warning Given to 

*/