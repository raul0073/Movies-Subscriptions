import React, { useEffect, useState } from "react";
import "./modal.scss";
import { getMovieSubsCountThisMonth } from "../../../Services/DB/moviesService";

export default function AllSubsModalComp({ isOpen, onClose, subs, movies }) {
  if (!isOpen) {
    return null;
  }

  const sortedSubs = subs.slice().sort((a, b) => {
    // since date is object of time stap this can be preformed and the result will sort date in decending order
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateB - dateA;
  });

  const getMovieThumbnail = (movieId) => {
    const movie = movies.find((mov) => mov._id === movieId);
    return movie ? movie.thumbnail : null;
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal">
        <h3>All Subscriptions</h3>
        <ul>
          {sortedSubs.map((sub) => (
            <>
              <div className="liWrapper">
                <li key={sub.id}>
                  {sub.movieName}
                  <small>{new Date(sub.date).toDateString("HE")}</small>
                </li>
                <img src={getMovieThumbnail(sub.movieId)} />
              </div>
            </>
          ))}
        </ul>
        <div className="footer">Total subscriptions: {sortedSubs.length}</div>
        <button onClick={onClose}>Close</button>
      </div>
    </>
  );
}
