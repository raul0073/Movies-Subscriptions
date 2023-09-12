const mongoose = require('mongoose')

const subsSchema = new mongoose.Schema({
    movieId: mongoose.Types.ObjectId,
    memberId: mongoose.Types.ObjectId,
    date: Date,
    movieName: String,
}, {versionKey:false})

const Subs = mongoose.model("subscriptions", subsSchema)

module.exports = Subs