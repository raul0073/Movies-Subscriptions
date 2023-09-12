import React, { useState } from "react";
import "./moviebox.scss";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { deleteMovie, getAllMovies } from "../../Services/DB/moviesService";
import { useMsgService } from "../../Services/Alert/msgService";
import SubscriptionsComp from "../Subscribers/Subscriptions";

export default function MovieBoxComp({ movie, getAllMoviesForPage }) {
  const nav = useNavigate();

  // if img is hovered play trailer
  const [imgIsHovered, setImgIsHovered] = useState(false);
  // subscribers is on?
  const [showSubs, setShowSubs] = useState(false);

  const { MessageDisplay, displayMsg } = useMsgService();

  // go to movie page and set item in storage
  const goToEditMovie = (mov) => {
    sessionStorage.setItem("MOV", JSON.stringify(mov));
    nav(`/main/movie/edit/${movie._id}`);
  };

  const delMov = async (id) => {
    try {
      await deleteMovie(id);
      // refresh the list
      let moviesList = await getAllMovies();  
      localStorage.setItem("MOVIES", JSON.stringify(moviesList));
      displayMsg("sucess", `Movie deleted successfully`);
    } catch (err) {
      displayMsg("fail", `Can't delete movie: ${err}`);
    }
  };

  // svg to create stars for rating
  const star = (
    <svg
      clip-rule="evenodd"
      fill-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44z"
        fill-rule="nonzero"
      />
    </svg>
  );
  const halfStar = (
    <svg
      clip-rule="evenodd"
      fill-rule="evenodd"
      stroke-linejoin="round"
      stroke-miterlimit="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m11.322 2.923c.126-.259.39-.423.678-.423.289 0 .552.164.678.423.974 1.998 2.65 5.44 2.65 5.44s3.811.524 6.022.829c.403.055.65.396.65.747 0 .19-.072.383-.231.536-1.61 1.538-4.382 4.191-4.382 4.191s.677 3.767 1.069 5.952c.083.462-.275.882-.742.882-.122 0-.244-.029-.355-.089-1.968-1.048-5.359-2.851-5.359-2.851s-3.391 1.803-5.359 2.851c-.111.06-.234.089-.356.089-.465 0-.825-.421-.741-.882.393-2.185 1.07-5.952 1.07-5.952s-2.773-2.653-4.382-4.191c-.16-.153-.232-.346-.232-.535 0-.352.249-.694.651-.748 2.211-.305 6.021-.829 6.021-.829s1.677-3.442 2.65-5.44zm.678 2.033v11.904l4.707 2.505-.951-5.236 3.851-3.662-5.314-.756z"
        fill-rule="nonzero"
      />
    </svg>
  );

  // function to generate stars for movie card
  const generateStarts = (rating) => {
    // full number?
    const wholeStars = Math.floor(rating);
    // not whole
    const remaining = rating - wholeStars >= 0.5;
    // stars list to fill for each movie
    const stars = [];
    // loop through the number of stars and add whole star
    for (let i = 0; i < wholeStars; i++) {
      stars.push(<React.Fragment key={`full-${i}`}>{star}</React.Fragment>);
    }
    // if the number has remaining in from all the stars, add half star
    if (remaining) {
      stars.push(<React.Fragment key="half">{halfStar}</React.Fragment>);
    }
    return stars;
  };

  return (
    <section className="movie-box">
      <MessageDisplay />
      <div className="movie">
        {!showSubs && (
          <picture
            className="thumbnail"
            onMouseOver={() => setImgIsHovered(true)}
            onMouseLeave={() => setImgIsHovered(false)}
          >
            {!imgIsHovered && <img src={movie.thumbnail} alt={movie.title} />}
            {imgIsHovered && (
              <ReactPlayer
                className="player"
                url={movie.trailer}
                playing={false}
                volume={0.1}
                width="100%"
                height="422px"
              ></ReactPlayer>
            )}
          </picture>
        )}
        {!showSubs && (
          <div className="info">
            <span className="title">
              <h2>{movie.title}</h2>
              <i>({movie.premiered})</i>{" "}
            </span>
            <div className="genres">
              {/* loop through genres */}
              {movie?.genres?.map((gen, index) => {
                return (
                  <React.Fragment key={index}>
                    <span>{gen}</span>
                  </React.Fragment>
                );
              })}
            </div>
            <div className="rating">{generateStarts(movie.rating)}</div>
            {/* pretty number for views */}
            <small>
              Watched:{" "}
              {movie.views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </small>
          </div>
        )}
        {/* generate sub comp for each */}
        {showSubs && movie.subscribers.length > 0 ? (
          <SubscriptionsComp subs={movie.subscribers} key={movie._id} />
        ) : (
          showSubs && (
            <h3 style={{ color: "grey", textAlign: "center" }}>
              No subscribers
            </h3>
          )
        )}
        <div className="btn">
          <button onClick={() => setShowSubs(!showSubs)}>Subscribers</button>
          <div className="actions">
            <button onClick={() => goToEditMovie(movie)}>Edit</button>
            <button onClick={() => delMov(movie._id)}>Delete</button>
          </div>
        </div>
      </div>
    </section>
  );
}
