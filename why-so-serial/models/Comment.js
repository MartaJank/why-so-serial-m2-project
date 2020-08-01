const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: String,
    comment: String,
});

commentSchema.set('timestamps', true);

const Comment = mongoose.model('User', commentSchema);
module.exports = Comment;