const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User Model & Schema Declaration
const UserSchema = new Schema({
    firstName: { type: String, require: true, maxLength: 150 },
    lastName: { type: String, require: true, maxLength: 150 },
    email: { type: String, require: true, maxLenght: 150 },
    password: { type: String, require: true, maxLength: 150 },
    exclusiveAccess: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
