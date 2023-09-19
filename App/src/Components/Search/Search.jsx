import React from 'react'
import './search.scss'

export default function SearchComp(props) {
    let movieCliked = props.clickedMovie

  
    return (
    <div className="search-bar">
        <div className="wrapper">
          <input
            type="text"
            placeholder="Search.."
            onChange={(e) => props.handleSearch(e.target.value)}
            onInput={(e) => props.handleSearch(e.target.value)}
            defaultValue={movieCliked}
          />
        </div>
      </div>
    );
  }
  