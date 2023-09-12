const Subs = require("../Models/SubscriptionModel");
const Movies = require("../Models/MovieModel")
const mongoose = require('mongoose')

const getAllSubs = async () => {
    try {
      const users = await Subs.find({});
      return users
    } catch (err) {
      console.error("Error while getting user:", err);
      throw new Error(`Can't get user:  ${err}`);
    }
  };
  

const addSubscription = async (subObj) => {
  try{
    const newSub = new Subs(subObj)
    let movieTitle = await Movies.findById(newSub.movieId)
    newSub.movieName = movieTitle.title
    await newSub.save();

    return {...newSub}
  }catch (err){
    throw new Error(`cant subscribe member: ${err}`);
  }

}



module.exports = { getAllSubs, addSubscription}