const mongoose = require('mongoose')

const membersSchema = new mongoose.Schema({
    email: String,
    name: String,
    country: String,
    city: String,
    dob:Date,
    avatar: String,
    flag: String
}, {versionKey: false})

const Member = mongoose.model("members", membersSchema)

module.exports = Member