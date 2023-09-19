import React, { useEffect, useState } from "react";
import "./subscriptions.scss";
import { useLocation, useNavigate } from "react-router-dom";
import "./subscriptions.scss";

export default function SubscriptionsComp({ subs, movies }) {
  const nav = useNavigate();
  const loc = useLocation();
  const [memberId, setMemberId] = useState('')
  // function will check which page is on and change links
  const checkWhichPageIsOn = (id, movieName) => {
    if (!loc.pathname.includes("members")) {
      nav(`/home/members/edit/${id}`);
    } else if (loc.pathname.includes("members")) {
      nav(`/home/search?movieName=${encodeURIComponent(movieName)}`);
    }
  };

  const sortedSubs = subs?.slice().sort((a, b) => {
    // since date is object of time stap this can be preformed and the result will sort date in decending order
    let dateA = new Date(a.date);
    let dateB = new Date(b.date);
    return dateB - dateA;
  });

  return (
    <section className="subscriptions">
      <h3>Member's subscriptions</h3>
      <ul>
        {sortedSubs ? (
          sortedSubs.map((sub, index) => {
            return (
              <React.Fragment key={sub._id}>
                {/* if we are in members page, the link will go to movie search, if we are in main page, the link will redirect to member page */}
                <li
                  onClick={() =>
                    checkWhichPageIsOn(sub.memberId, sub.movieName)
                  }
                >
                  {sub.movieName ? sub.movieName : sub.name}
                  <br />
                  <small>
                    Watched on: <i>{new Date(sub.date).toDateString("he")}</i>
                  </small>
                </li>
              </React.Fragment>
            );
          })
        ) : (
          <>
            <h3>No subscriptions found</h3>
          </>
        )}
      </ul>
    </section>
  );
}
