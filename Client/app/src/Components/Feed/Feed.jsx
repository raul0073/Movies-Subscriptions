import React, { useEffect, useState } from "react";
import "./feed.scss";
import MovieBoxComp from "../MovieBox/MovieBox";
import { getAllMovies } from "../../Services/DB/MoviesService";
import SearchComp from "../Search/Search";
import SearchErrorComp from "../Errors/Search";
import { useParams } from "react-router-dom";

// this comp hold all movies, this is the main page feed
export default function FeedComp() {
  const [moviesList, setMoviesList] = useState([]);
  // search variable
  const [searchTerm, setSearchTerm] = useState("");
  // have 2 list to compare
  const [originalMoviesList, setOriginalMoviesList] = useState([]);
  // clicked movie name for if search comes from defferent page
  const [clickedMovie, setClickedMovie] = useState();
  // when error on search
  const [searchError, setSearchError] = useState(false);

  const params = useParams();
  let moviesFromLocal = localStorage.getItem("MOVIES");
  // function will get all movies data with subscribers
  const getAllMoviesForPage = async () => {
    
    moviesFromLocal = localStorage.getItem("MOVIES");
    if (!moviesFromLocal) {
      let movies = await getAllMovies();
      // set movies to searchewdd
      setMoviesList(movies);
      localStorage.setItem("MOVIES", JSON.stringify(movies));
      setOriginalMoviesList(movies);
    } else {
      moviesFromLocal = JSON.parse(moviesFromLocal);
      setOriginalMoviesList(moviesFromLocal);
      setMoviesList(moviesFromLocal);
    }
  };

  // function will get search results
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    // filter the movies list
    const searchedMovies = originalMoviesList.filter((mov) =>
      mov.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // movies list will be updated
    setMoviesList(searchedMovies);
    // set bool for error comp
    moviesList.length == 0 ? setSearchError(true) : setSearchError(false);
  };

  useEffect(() => {
    // check if seached movie
    if (params.movie) {
      setClickedMovie(params.movie);
      setSearchTerm(params.movie);
    } else {
      // reset movie clicked
      setClickedMovie("");
    }

    // filter movies and set movies list
    const filteredMovie = originalMoviesList.filter((mov) =>
      mov.title.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setMoviesList(filteredMovie);
    // show error if none is found
    setSearchError(filteredMovie.length === 0);
  }, [params.movie, searchTerm, originalMoviesList]);

  useEffect(() => {
    // get all data
    getAllMoviesForPage();
  }, [params,moviesFromLocal]);

  return (
    <>
      <section className="feed">
        <div className="searchAbs">
          <SearchComp handleSearch={handleSearch} clickedMovie={clickedMovie} />
        </div>

        <div className="promo" style={{ background: "red" }}>
          <marquee direction="right" scrollamount="2">
            👑 BUY VIP PACKAGE NOW 👑&emsp;|&emsp; CUSTOMER SERVICE DOES NOT
            EXIST
          </marquee>
        </div>

        <div className={searchError ? "movies" : "movies grid"}>
          {moviesList.length > 0 ? (
            moviesList.map((mov) => (
              <React.Fragment key={mov._id}>
                <MovieBoxComp
                  key={mov._id}
                  movie={mov}
                  getAllMoviesForPage={getAllMoviesForPage}
                />
              </React.Fragment>
            ))
          ) : (
            <SearchErrorComp />
          )}
        </div>
      </section>
    </>
  );
}
