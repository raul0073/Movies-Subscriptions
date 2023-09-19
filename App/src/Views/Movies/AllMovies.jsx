import React, { useEffect, useState } from "react";
import "./Styles/allmovies.scss";
import { getAllMovies } from "../../Utilities/DB/MoviesService";
import SearchComp from "../../Components/Search/Search";
import SearchErrorComp from "../../Components/Error/searchError";
import { useLocation, useParams } from "react-router-dom";
import MovieBoxComp from "./Components/MovieBox";
import { useMsgService } from "../../Utilities/Alerts/msgService";
import { useAtom } from "jotai";
import { MoviesAtom, StoreVersion } from "../../Atoms";

export default function AllMoviesComp() {
  const { MessageDisplay, alertMsg } = useMsgService();
  const loc = useLocation();
  // create a query for search
  const queryParams = new URLSearchParams(loc.search)
  const movieNameParam = queryParams.get("movieName")
  // movies store
  const [moviesListAtom, setMoviesListAtom] = useAtom(MoviesAtom);
  const [storeV, setStoreV] = useAtom(StoreVersion)
  // another list for filltered results
  const [moviesList, setMoviesList] = useState([]);
  // search term variable
  const [searchTerm, setSearchTerm] = useState("");
  // clicked movie if name come in url
  const [clickedMovie, setClickedMovie] = useState("");
  // search error comp flag
  const [searchError, setSearchError] = useState(false);

  const getMoviesAndSetStore = async () => {
    try {
      const moviesList = await getAllMovies();
      setMoviesListAtom(moviesList);
      setMoviesList(moviesList);
    } catch (error) {
      // Handle the error if the fetch fails
      console.error("Error fetching movies:", error);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    // check search term is legitt
    if (searchTerm === "") {
      setMoviesList(moviesListAtom);
    } else {
      // filter mopvies
      const searchedMovies = moviesListAtom.filter((mov) =>
        mov.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchError(searchedMovies.length === 0);
      setMoviesList(searchedMovies);
    }
  };

  useEffect(() => {
    if(movieNameParam) {
      setClickedMovie(movieNameParam)
      handleSearch(movieNameParam)
    } else if(
        !moviesListAtom || moviesListAtom.length === 0
      ) {
        getMoviesAndSetStore()
        console.log("fetched");
      } else{
        setMoviesList([...moviesListAtom]);
        console.log("atom");
      }
  }, [storeV, movieNameParam]);

  return (
    <>
      <section className="feed">
        <div className="searchAbs">
          <SearchComp handleSearch={handleSearch} clickedMovie={clickedMovie}/>
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
                <MovieBoxComp key={mov._id} movie={mov} />
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
