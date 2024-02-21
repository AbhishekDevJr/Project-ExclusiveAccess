const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    time_stamp: { type: String, require: true },
    createdBy: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model('Post', PostSchema);