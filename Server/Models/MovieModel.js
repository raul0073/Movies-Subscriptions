const mongoose = require('mongoose')

// movie schema
const movieSchema = new mongoose.Schema({
    title: String,
    premiered: String,
    genres: [String],
    thumbnail: String,
    rating: Number,
    trailer: String,
    description: String,
    duration: String,
    views: Number,
    subscribers: {
        _id : String,
        name: String,
        date: Date
    }
},{ versionKey: false });
  

const Movie = mongoose.model('movies', movieSchema);

module.exports = Movie