const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: {type: String, required: true},
    timeStamp: {type: Date, default: Date.now()},
    text: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'Users'}
})

module.exports = mongoose.model("Messages", MessageSchema);
