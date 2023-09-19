import React, { useEffect, useState } from "react";
import { getFromLocalStorage } from "../../Utilities/SecureStorage/StorageService";
import ButtonWithLoading from "../../Components/Button/ButtonWithLoading";
import { useMsgService } from "../../Utilities/Alerts/msgService";
import "./Styles/editmovie.scss";
import './Styles/addmovie.scss'
import { addMovie, updateMovie } from "../../Utilities/DB/MoviesService";
import { useAtom } from "jotai";
import { MoviesAtom } from "../../Atoms";
import { useNavigate, useParams } from "react-router-dom";
import AddMoviesIcon from "../../assets/Pages/AddMoviesIcon";
import { validateMovieDetails } from "../../Utilities/Forms/FormsValidation";
import genresData from './Data/genresData.json'


export default function AddMoviePage() {
  const [moviesListAtom, setMoviesListAtom] = useAtom(MoviesAtom);
  const { alertMsg, MessageDisplay } = useMsgService();
  // list to hold genres
  const [genresList, setGenresList] = useState([]);
  // to know if there is value in input
  const [currentGenre, setCurrentGenre] = useState("");
  // to know if suggetion shuld appear
  const [isSuggestionsFull, setIsSuggestionsFull] = useState(false);
  // movie data
  const [movieData, setMovieData] = useState({
    title: "",
    premiered: "",
    genres: [],
    thumbnail: "",
    rating: 0,
    trailer: "",
    views: 0,
    duration: "",
  });
  const [genreSuggestions, setGenreSuggestions] = useState([]);
  const nav = useNavigate();

  // function to handle genre input and suggestions
  const showSuggestions = (e) => {
    const inputGenre = e.target.value;
    setCurrentGenre(inputGenre);
    // matching genres from genresData
    const matchingGenres = genresData.genres.filter((genre) =>
      genre.toLowerCase().startsWith(inputGenre.toLowerCase())
    );
    // the autocomplete suggestions
    setGenreSuggestions(matchingGenres);
    // visibility of suggestions on input value
    setIsSuggestionsFull(inputGenre.length > 0);
  };

  // add the first suggestion to genresList when Tab is pressed
  const addGenre = (e) => {
    if (e.key === "Tab" && genreSuggestions.length > 0) {
      e.preventDefault();
      const selectedGenre = genreSuggestions[0];
      // add data to obj and clear
      setGenresList([...genresList, selectedGenre]);
      setMovieData({ ...movieData, genres: [...genresList, selectedGenre] });
      setCurrentGenre("");
      e.target.value = "";
      setGenreSuggestions([]);
    }
  };
  // clickable genres can be remove
  const deleteGenre = (indexToDelete) => {
    // Create a copy of the current genresList array
    const updatedGenresList = [...genresList];
    // Remove the genre at the specified index
    updatedGenresList.splice(indexToDelete, 1);
    // Update the state with the updated genresList
    setGenresList(updatedGenresList);
    // Update the movieData with the new genres list
    setMovieData({ ...movieData, genres: updatedGenresList });
  };

  // Function to add movie
  const addMov = async () => {
    // validate movie
    let errorMsg = validateMovieDetails(movieData);
    if (errorMsg) {
      alertMsg("fail", errorMsg);
    } else {
      try {
        let res = await addMovie(movieData);
        const addedMovie = res.mov;
        // update movies in storage
        setMoviesListAtom((preState)=> [...preState, addedMovie])
        alertMsg("success", `${movieData.title} Added to DB `);
      } catch (err) {
        alertMsg("fail", `Could not add movie `);
      }
    }
  };

  return (
    <section className="movie-page">
      <MessageDisplay />
      <div className="movie-container">
        <div className="card">
          <div className="art">
            <AddMoviesIcon />
          </div>
          <div className="header">
            <h3>Enter movie details</h3>
          </div>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) =>
              setMovieData({ ...movieData, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Premiered YYYY"
            onChange={(e) =>
              setMovieData({ ...movieData, premiered: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Genres"
            value={currentGenre}
            onInput={showSuggestions}
            onKeyDown={addGenre}
          />
          {/* as tabs may be one or more... click on tab will add genre, suggestions will appear as well, tab will add the first suggestion */}
          <i>
            <small style={{ color: "grey" }}>Enter genre and press 'Tab'</small>
          </i>
          <div className="genresList">
            <div
              className={`autocomplete-suggestions ${
                isSuggestionsFull ? "autocomplete-suggestions-visible" : ""
              }`}
            >
              {genreSuggestions.map((genre, index) => (
                <div
                  key={index}
                  className="autocomplete-suggestion"
                  onClick={() => {
                    setGenresList([...genresList, genre]);
                    setMovieData({
                      ...movieData,
                      genres: [...genresList, genre],
                    });
                    setCurrentGenre("");
                    setGenreSuggestions([]);
                  }}
                >
                  {genre}
                </div>
              ))}
            </div>
            {/* show genres so far */}
            {genresList &&
              genresList.map((gen, index) => {
                return (
                  <React.Fragment key={index}>
                    <span onClick={() => deleteGenre(index)}>{gen}&nbsp;</span>
                  </React.Fragment>
                );
              })}
          </div>

          <input
            type="text"
            placeholder="Thumbnail link"
            onChange={(e) => {
              setMovieData({ ...movieData, thumbnail: e.target.value });
            }}
          />

          <input
            type="number"
            placeholder="Rating"
            onChange={(e) =>
              setMovieData({ ...movieData, rating: +e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Trailer link"
            onChange={(e) =>
              setMovieData({ ...movieData, trailer: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Views"
            onChange={(e) =>
              setMovieData({ ...movieData, views: +e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Duration *h *m"
            onChange={(e) =>
              setMovieData({ ...movieData, duration: e.target.value })
            }
          />
          <div className="btn">
            <ButtonWithLoading text="Add movie" action={addMov} />
            <button onClick={() => nav("/home")}>Go back</button>
          </div>
        </div>
      </div>
    </section>
  );
}
