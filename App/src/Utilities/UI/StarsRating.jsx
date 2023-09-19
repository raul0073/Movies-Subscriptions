import React from "react";
import HalfStarIcon from "../../assets/MovieBox/HalfStar";
import StarIcon from "../../assets/MovieBox/Star";

export const generateStarts = (rating) => {
   // function to generate stars for movie card
  // full number?
  const wholeStars = Math.floor(rating);
  // not whole
  const remaining = rating - wholeStars >= 0.5;
  // stars list to fill for each movie
  const stars = [];
  // loop through the number of stars and add whole star
  for (let i = 0; i < wholeStars; i++) {
    stars.push(<React.Fragment key={`full-${i}`}>{<StarIcon />}</React.Fragment>);
  }
  // if the number has remaining in from all the stars, add half star
  if (remaining) {
    stars.push(<React.Fragment key="half">{<HalfStarIcon />}</React.Fragment>);
  }
  return stars;
};