const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Post Model & Schema Declaration
const PostSchema = new Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    time_stamp: { type: String, require: true },
    createdBy: { type: Schema.Types.ObjectId },
    author: { type: String, required: true },
    updatedAt: { type: String, require: false },
});

module.exports = mongoose.model('Post', PostSchema);