const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const killerSchema = new Schema ({
    image: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    lastName: String,
    aka: String,
    gender: String,
    birthDate: String,
    zodiacSign: String,
    yearsActive: [Number],
    numberOfVictimsConfirmed: Number,
    numberOfVictimsPossible: Number,
    country: String,
    weapons: [String],
    arrested: Number,
    victimProfile: String,
    murderType: [String],
    description: String,
    books: [String]
});

killerSchema.set('timestamps', true);

const Killer = mongoose.model('Killer', killerSchema);
module.exports = Killer;