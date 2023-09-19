import React from "react";
import "./searchError.scss";
import ErrorIcon from "../../assets/403/ErrorIcon";

export default function SearchErrorComp() {
  return (
    <div className="error">
      <div className="art">
      {<ErrorIcon />}
      </div>
      <h2>
        Oops, we can't find your movie...
        <p>Try searching for a movie that exists</p>
      </h2>
    </div>
  );
}
