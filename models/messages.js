const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: {type: String, required: true},
    timeStamp: {type: Date, default: Date.now()},
    text: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'Users'}
})

MessageSchema.virtual('url').get(function() {
  return `/dashboard/message/${this._id}`;
})

module.exports = mongoose.model("Messages", MessageSchema);
