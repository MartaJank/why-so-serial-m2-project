const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    killerReviewed: { type: Schema.Types.ObjectId, ref: 'Killer' }
});

commentSchema.set('timestamps', true);

const Comment = mongoose.model('User', commentSchema);
module.exports = Comment;