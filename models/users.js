const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const UserSchema = new Scheme({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true},
    messages: [{type: Scheme.Types.ObjectId, ref: 'Messages'}],
    status: {type: String, required: true, default: 'user' },
    salt: {type: String},
    hash: {type: String}
    
})

module.exports = mongoose.model("Users", UserSchema);