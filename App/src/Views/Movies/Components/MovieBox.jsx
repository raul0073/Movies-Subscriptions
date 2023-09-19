  import React, {useEffect, useState} from 'react'
  import { useMsgService } from '../../../Utilities/Alerts/msgService';
  import { useNavigate } from 'react-router-dom';
  import { setInLocalStorage, getFromLocalStorage } from '../../../Utilities/SecureStorage/StorageService';
  import { generateStarts } from '../../../Utilities/UI/StarsRating';
  import { deleteMovie } from '../../../Utilities/DB/MoviesService';
  import ReactPlayer from "react-player";
  import './moviebox.scss'
  import SubscriptionsComp from '../../../Components/Subscribers/Subscriptions';
  import { MoviesAtom, StoreVersion } from '../../../Atoms';
  import { useAtom } from 'jotai';

  export default function MovieBoxComp({ movie }) {
    const nav = useNavigate();
    const {MessageDisplay, alertMsg} = useMsgService();

    // state for thumbnail to change to trailer vid
    const [isImgHovered, setIsImgHovered] = useState(false)
    // state for if subscribers view is on
    const [subscribersView, setSubscribersView] = useState(false)
    const [movieAtomList, setMoviesListAtom] = useAtom(MoviesAtom);
    const [storeV, setStoreV] = useAtom(StoreVersion)

    // go to movie page and set item in storage
    const goToEditMovie = (mov) => {
      setInLocalStorage("MOV", mov)
      nav(`/home/movie/edit/${movie._id}`);
    };

    const delMov = async (id) => {
      try {
        await deleteMovie(id);
        // refresh the list in atom
        setMoviesListAtom((prevMoviesList) => (
          prevMoviesList.filter((movie) => movie._id !== id)
        ));
        setStoreV((preState) => preState +1)
        alertMsg("sucess", `Movie deleted successfully`);
      } catch (err) {
        alertMsg("fail", `Can't delete movie: ${err}`);
      }
    };

    useEffect(()=> {
    
    },[storeV])
    return (
      <section className="movie-box">
        <MessageDisplay />
        <div className="movie">
          {!subscribersView && (
            <picture
              className="thumbnail"
              onMouseOver={() => setIsImgHovered(true)}
              onMouseLeave={() => setIsImgHovered(false)}
            >
              {!isImgHovered && <img src={movie.thumbnail} alt={movie.title} />}
              {isImgHovered && (
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
          {!subscribersView && (
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
                {movie.views?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </small>
            </div>
          )}
          {/* generate sub comp for each */}
          {subscribersView && movie.subscribers.length > 0 ? (
            <SubscriptionsComp subs={movie.subscribers} key={movie._id} />
          ) : (
            subscribersView && (
              <h3 style={{ color: "grey", textAlign: "center" }}>
                No subscribers
              </h3>
            )
          )}
          <div className="btn">
            <button onClick={() => setSubscribersView(!subscribersView)}>Subscribers</button>
            <div className="actions">
              <button onClick={() => goToEditMovie(movie)}>Edit</button>
              <button onClick={() => delMov(movie._id)}>Delete</button>
            </div>
          </div>
        </div>
      </section>
    )
  }
