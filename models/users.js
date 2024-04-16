const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const UserSchema = new Scheme({
    fullname: {type: String, required: true},
    username: {type: String, required: true},
    status: {type: String, required: true, default: 'user' },
    salt: {type: String},
    hash: {type: String}
    
})

module.exports = mongoose.model("Users", UserSchema);
