const mongoose = require('mongoose')
const bcrypt = require('mongoose-bcrypt')

// user schema
const userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    isManager: Boolean,
    isOnline: Boolean
  });
  
// hash pass 
userSchema.plugin(bcrypt);
    
  


const User = mongoose.model('users', userSchema);

module.exports = User




// 