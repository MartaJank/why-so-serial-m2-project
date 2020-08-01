const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    image: {type: String, default: '../images/avatar.png'},
    name: String,
    email: String,
    password: String,
    hasKiller: { type: Boolean, default: false }
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);
module.exports = User;