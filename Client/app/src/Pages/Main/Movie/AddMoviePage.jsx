import React, { useState } from "react";
import "./moviepage.scss";
import { useMsgService } from "../../../Services/Alert/msgService";
import { addMovie, getAllMovies } from "../../../Services/DB/moviesService";
import { validateMovieDetails } from "../../../Services/FormsValidations/formsValidations";
import ButtonWithLoadingComp from "../../../Components/Button/ButtonWithLoading";
import genresData from "./data/genres.json";

export default function MoviePage() {
  // msg service
  const { displayMsg, MessageDisplay } = useMsgService();
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

  // Function to add movie
  const addMov = async () => {
    // validate movie
    let errorMsg = validateMovieDetails(movieData);
    if (errorMsg) {
      displayMsg("fail", errorMsg);

    } else {
      try {
        await addMovie(movieData);
        // update movies in storage
        let moviesList = await getAllMovies();
        localStorage.setItem("MOVIES", JSON.stringify(moviesList));

        displayMsg("success", `${movieData.title} Added to DB `);
      } catch (err) {
        displayMsg("fail", `Could not add movie `);
      }
    }
  };

  return (
    <section className="movie-page">
      <MessageDisplay />
      <div className="movie-container">
        <h2>Add movie</h2>
        <div className="card">
          <div className="art">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
            >
              <path d="M19.5 14c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-8.498 2h-7.502v-8h10v.032c1.872-1.203 4.113-1.319 6-.53v-11.502h-22v22h14.82c-.553-.576-1.006-1.251-1.318-2zm4.498-18h2v2h-2v-2zm0 4h2v2h-2v-2zm-12-4h10v8h-10v-8zm-2 18h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2v-2h2v2z" />
            </svg>
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
              {/* will allow on click to add genre */}
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
                    <span>{gen}&nbsp;</span>
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
            <ButtonWithLoadingComp text="Add movie" action={addMov} />
          </div>
        </div>
      </div>
    </section>
  );
}
