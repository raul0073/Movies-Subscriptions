import React, { useEffect, useState } from "react";
import { getFromLocalStorage } from "../../Utilities/SecureStorage/StorageService";
import ButtonWithLoading from "../../Components/Button/ButtonWithLoading";
import { useMsgService } from "../../Utilities/Alerts/msgService";
import "./Styles/editmovie.scss";
import { updateMovie } from "../../Utilities/DB/MoviesService";
import { useAtom } from "jotai";
import { MoviesAtom } from "../../Atoms";
import { useNavigate, useParams } from "react-router-dom";

export default function EditMoviePage() {
  const { MessageDisplay, alertMsg } = useMsgService();
  const [movieAtomList, setMoviesListAtom] = useAtom(MoviesAtom);
  const [editMovieData, setEditMovieData] = useState(null);
  const params = useParams();
  const nav = useNavigate();

  const getMovieDetails = () => {
    const { id } = params;
    const movie = movieAtomList.find((mov) => mov._id === id);
    setEditMovieData(movie);
  };

  // function to update movie
  const updateMov = async () => {
    try {
      let id = editMovieData._id;
      await updateMovie(id, editMovieData);
      setMoviesListAtom((prev) =>
        prev.map((movie) =>
          movie._id === editMovieData._id ? editMovieData : movie
        )
      );
      alertMsg("success", `Movie updated ${editMovieData.title}`);
    } catch (err) {
      alertMsg("fail", `Movie could not be updated ${editMovieData._id}`);
    }
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return (
    <section className="movie-page">
      <MessageDisplay />
      <div className="movie-container">
        <div className="card">
          <h3>Edit movie details</h3>
          <div className="art">
            <img src={editMovieData?.thumbnail} alt={editMovieData?.title} />
          </div>
          <div className="header">
            {editMovieData ? (
              <>
                <input
                  type="text"
                  onChange={(e) => {
                    setEditMovieData({
                      ...editMovieData,
                      title: e.target.value,
                    });
                  }}
                  value={editMovieData.title}
                />
                <legend>Movie genres</legend>
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
                    setEditMovieData({
                      ...editMovieData,
                      views: e.target.value,
                    });
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
          </div>
          <div className="btn">
            <ButtonWithLoading action={updateMov} text="Edit movie" />
            <button onClick={()=> nav('/home')}>Go back</button>
          </div>
        </div>
      </div>
    </section>
  );
}
