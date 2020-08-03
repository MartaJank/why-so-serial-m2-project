const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    image: { type: String, default: 'https://res.cloudinary.com/patricio/image/upload/v1596467602/images/avatar_dwdpij.png' },
    name: String,
    email: String,
    password: String,
    isAuthor: { type: Boolean, default: false },
    killersCreated: [{ type: Schema.Types.ObjectId, ref: 'Killer' }]
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);
module.exports = User;