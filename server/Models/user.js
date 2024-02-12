const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: { type: String, require: true, maxLength: 150 },
    last_name: { type: String, require: true, maxLength: 150 },
    user_name: { type: String, require: true, maxLenght: 150 },
    password: { type: String, require: true, maxLength: 150 }
});

module.exports = mongoose.model('User', UserSchema);
