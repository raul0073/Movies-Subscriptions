const Movie = require("../Models/MovieModel");
const User = require("../Models/UsersModel");
const Member = require("../Models/MembersModel");
const Subs = require("../Models/SubscriptionModel");
const mongoose = require("mongoose");

// function will combine movies data with subscribers name and date of subscription
const getAllMoviesWithSubscribers = async () => {
  try {
    // lean prevent the object returned from having  unnecessery data
    // get all data
    const movies = await Movie.find({}).lean();
    const subs = await Subs.find({}).lean();
    const members = await Member.find({}).lean();

    // crerate asubs mapping obj
    const subscribersMap = {};

    // for each subscription
    subs.forEach((sub) => {
      // add these keys to be sub
      const { movieId, memberId, date } = sub;
      // covert to str
      const strMovieId = movieId.toString();

      //add the mov id to subscribers map if its not there
      if (!subscribersMap[strMovieId]) {
        subscribersMap[strMovieId] = [];
      }

      // add the obj to each member
      const member = members.find(
        (member) => member._id.toString() === memberId.toString()
      );
      if (member) {
        subscribersMap[strMovieId].push({ memberId, name: member.name, date });
      }
    });

    // combine the two
    const moviesWithSubscribers = movies.map((movie) => ({
      ...movie,
      subscribers: subscribersMap[movie._id.toString()] || [],
    }));

    return moviesWithSubscribers;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// add movie, no need for description
const addMovie = async (movie) => {
  try {
    let newMovie = new Movie(movie);
    await newMovie.save();
    return { mov: newMovie, msg: "Movie add successfully" };
  } catch (err) {
    throw new Error(`cant add movie: ${err}`);
  }
};

const updatedMovie = async (id, movObj) => {
  try {
    let data = await Movie.findByIdAndUpdate(id, movObj);
    return { mov: data, msg: "Movie updated successfully" };
  } catch (err) {
    throw new Error("Cant update movie");
  }
};

const deleteMovieById = async (id) => {
  try {
    await Movie.findByIdAndDelete(id);
    await Subs.deleteMany({ movieId: id });
    return "Movie & Subscription deleted successfully";
  } catch (err) {
    throw new Error(`Can't delete movie: ${err}`);
  }
};

async function getAllTimeSubscribersCountForMovie(movieId) {
  try {
    const subscribers = await Subs.countDocuments({
      movieId: movieId,
    });
    return subscribers;
  } catch (error) {
    console.error("Error getting all-time subscribers count for movie:", error);
    throw error;
  }
}
module.exports = {
  getAllMoviesWithSubscribers,
  addMovie,
  updatedMovie,
  deleteMovieById,
  getAllTimeSubscribersCountForMovie,
};
