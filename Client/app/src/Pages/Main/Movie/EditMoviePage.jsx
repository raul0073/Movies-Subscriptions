import React, { useEffect, useState } from "react";
import "./moviepage.scss";
import { useMsgService } from "../../../Services/Alert/msgService";
import { updateMovie } from "../../../Services/DB/MoviesService";
import ButtonWithLoadingComp from "../../../Components/Button/ButtonWithLoading";
import { getAllMovies } from "../../../Services/DB/MoviesService";

export default function EditMoviePage() {
  const { MessageDisplay, displayMsg } = useMsgService();
  const [editMovieData, setEditMovieData] = useState();

  const getMovieDetails = () => {
    let mov = sessionStorage.getItem("MOV");

    setTimeout(() => {
      setEditMovieData(JSON.parse(mov));
    }, 500);
  };

  // function to update movie
  const updateMov = async () => {
    try {
      let id = editMovieData._id;
      await updateMovie(id, editMovieData);
      // update movies in storage
      let moviesList = await getAllMovies();
      localStorage.setItem("MOVIES", JSON.stringify(moviesList));
      displayMsg("success", `Movie updated ${editMovieData.title}`);
    } catch (err) {
      displayMsg("fail", `Movie could not be updated ${editMovieData._id}`);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <section className="movie-page">
      <MessageDisplay />
      <div className="movie-container">
        <h2>Edit movie</h2>
        <div className="card">
          <div className="art">
            <img src={editMovieData?.thumbnail} alt={editMovieData?.title} />
          </div>
          <div className="header">
            <h3>Edit movie details</h3>
          </div>
          {editMovieData ? (
            <>
              <input
                type="text"
                onChange={(e) => {
                  setEditMovieData({ ...editMovieData, title: e.target.value });
                }}
                value={editMovieData.title}
              />
              {editMovieData.genres.map((gen, index) => {
                return (
                  <React.Fragment key={index}>
                    <input
                      type="text"
                      onChange={(e) => {
                        setEditMovieData({
                          ...editMovieData,
                          genres: e.target.value,
                        });
                      }}
                      value={gen}
                    />
                  </React.Fragment>
                );
              })}
              <input
                type="text"
                onChange={(e) => {
                  setEditMovieData({
                    ...editMovieData,
                    premiered: e.target.value,
                  });
                }}
                value={editMovieData.premiered}
              />
              <input
                type="text"
                onChange={(e) => {
                  setEditMovieData({
                    ...editMovieData,
                    thumbnail: e.target.value,
                  });
                }}
                value={editMovieData.thumbnail}
              />
              <input
                type="text"
                onChange={(e) => {
                  setEditMovieData({
                    ...editMovieData,
                    trailer: e.target.value,
                  });
                }}
                value={editMovieData.rating}
              />
              <input
                type="text"
                onChange={(e) => {
                  setEditMovieData({
                    ...editMovieData,
                    rating: e.target.value,
                  });
                }}
                value={editMovieData.trailer}
              />
              <input
                type="text"
                onChange={(e) => {
                  setEditMovieData({ ...editMovieData, views: e.target.value });
                }}
                value={editMovieData.views}
              />
              <input
                type="text"
                onChange={(e) => {
                  setEditMovieData({
                    ...editMovieData,
                    duration: e.target.value,
                  });
                }}
                value={editMovieData.duration}
              />
            </>
          ) : (
            <>
              <h2>Something went wrong... try again later</h2>
            </>
          )}

          <div className="btn">
            <ButtonWithLoadingComp action={updateMov} text="Edit movie" />
          </div>
        </div>
      </div>
    </section>
  );
}
