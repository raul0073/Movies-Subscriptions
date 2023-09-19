const Subs = require("../Models/SubscriptionModel");
const Movies = require("../Models/MovieModel");
const membersBLL = require("../BLL/MembersBLL");
const mongoose = require("mongoose");

const getAllSubs = async () => {
  try {
    const users = await Subs.find({});
    return users;
  } catch (err) {
    console.error("Error while getting user:", err);
    throw new Error(`Can't get user:  ${err}`);
  }
};

const addSubscription = async (subObj) => {
  try {
    // create sub obj
    const newSub = new Subs(subObj);
    let movieTitle = await Movies.findById(newSub.movieId);
    // add movie title
    newSub.movieName = movieTitle.title;
    await newSub.save();

    // return an obj to add to movies
    const subObjForMovie = {
      memberId: subObj.memberId,
      date: newSub.date,
      name: newSub.memberName,
    };
    // get updated data
    let movies = await Movies.find({});
    let members = await membersBLL.getAllMembersWithSubsInfo();

    return { members, movies, subObjForMovie };
  } catch (err) {
    throw new Error(`cant subscribe member: ${err}`);
  }
};

module.exports = { getAllSubs, addSubscription };
