const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const UserSchema = new Scheme({
    fullname: {type: String, required: true},
    username: {type: String, required: true},
    messages: [{type: Scheme.Types.ObjectId, ref: 'Messages'}],
    status: {type: String, required: true, default: 'User' },
    salt: {type: String},
    hash: {type: String}
    
})

module.exports = mongoose.model("Users", UserSchema);