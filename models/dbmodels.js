const mongoose = require("mongoose");


const umPire = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    age: Number
})

const myPlayers = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true,
    },
    tech: {
        type: Array,
        required: true
    },
    career: {
        type: Object,
        required: true
    }
})

exports.UmPireModel = mongoose.model('umpires',umPire);
exports.PlayerModel = mongoose.model('players',myPlayers);