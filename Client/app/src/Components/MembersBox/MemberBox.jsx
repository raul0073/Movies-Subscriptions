import React, { useState, useEffect } from "react";
import SubscriptionsComp from "../Subscribers/Subscriptions";
import "./memberbox.scss";
import { useNavigate } from "react-router-dom";
import { addSubscriptionToMember } from "../../Services/DB/subscriptionService";
import { useMsgService } from "../../Services/Alert/msgService";
import { delMember, getAllMembers } from "../../Services/DB/membersService";
import mailIcon from "../../assets/memberBox/iconmonstr-email-15-32.png";
import birthdayIcon from "../../assets/memberBox/iconmonstr-candy-15-32.png";
import locationIcon from "../../assets/memberBox/iconmonstr-crosshair-10-32.png";
import AllSubsModalComp from "../Subscribers/SubscriptionModal/AllSubsModal";
import secureLocalStorage from "react-secure-storage";

export default function MemberBoxComp({
  memberDetails,
  subsDetails,
  getAllMembers,
}) {
  // bool for is add sub page
  const [isAddSub, setIsAddSub] = useState(false);
  // initailize sub obj
  const [subObj, setSubObj] = useState({ memberId: memberDetails._id });
  // filtered movies list for each member
  const [moviesToSubscribe, setMoviesToSubscribe] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  // msg display service
  const { MessageDisplay, displayMsg } = useMsgService();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const nav = useNavigate();

  // add subscription to member
  const addSub = async () => {
    try {
      // add movie name
      subObj.movieName = subsDetails.movieName;
      await addSubscriptionToMember(subObj);
      let newMembersData = await getAllMembers();
      displayMsg("success", "Subscription added successfully");
    } catch (err) {
      console.log(err);
      displayMsg("fail", "Failed to subscribe member to movie");
    }
  };

  // filter movies for each member
  const filterMoviesByMemberId = (id) => {
    // get movies from seesion
    let movies = localStorage.getItem("MOVIES");
    movies = JSON.parse(movies);
    setAllMovies(movies);
    // return only movies that DONT have subscription by member
    const selectedMovies = movies.filter((movie) => {
      return !movie.subscribers.some(
        (subscriber) => subscriber.memberId === id
      );
    });

    return setMoviesToSubscribe(selectedMovies);
  };

  // delete member
  const delMemWithSubs = async (id) => {
    try {
      // confirm delete
      window.confirm("Delete Member?");
      await delMember(id);
      let newAkkMembers = await getAllMembers();
      secureLocalStorage.setItem("MEMBERS", JSON.stringify(newAkkMembers));
      displayMsg("success", "Member deleted successfully");
      // redirect to main page
      setTimeout(() => {
        nav("/main");
      }, 2000);
    } catch (err) {
      displayMsg("fail", "Error, cant delete member" + err.message);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    filterMoviesByMemberId(memberDetails._id);
  }, []);

  // know when to show 'see more subs'
  const remainingSubs = subsDetails.length - 4;

  return (
    <>
      <MessageDisplay />
      <section className="memberBox">
        <div className="prof_img">
          <img src={memberDetails.avatar} alt="user avatar" />
        </div>
        <div className="info">
          <ul>
            {memberDetails ? (
              <>
                <h3>{memberDetails.name} </h3>

                <p>
                  <img className="icons" src={locationIcon} />
                  {memberDetails.city}, &nbsp;
                  <img
                    src={`https://flagcdn.com/${memberDetails.country.toLowerCase()}.svg`}
                  />
                  {memberDetails.flag}
                </p>
                <p>
                  <img className="icons" src={birthdayIcon} />
                  {new Date(memberDetails.dob).toDateString("HE")}
                </p>
                <p>
                  <img className="icons" src={mailIcon} />
                  {memberDetails.email}
                </p>
              </>
            ) : (
              <h2>Failed to get member data</h2>
            )}
            <div className="actions">
              <button
                onClick={() => {
                  nav(`/main/members/${memberDetails._id}`);
                }}
              >
                <svg
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m11.239 15.533c-1.045 3.004-1.238 3.451-1.238 3.84 0 .441.385.627.627.627.272 0 1.108-.301 3.829-1.249zm.888-.888 3.22 3.22 6.408-6.401c.163-.163.245-.376.245-.591 0-.213-.082-.427-.245-.591-.58-.579-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245zm-3.127-.895c0-.402-.356-.75-.75-.75-2.561 0-2.939 0-5.5 0-.394 0-.75.348-.75.75s.356.75.75.75h5.5c.394 0 .75-.348.75-.75zm5-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75z"
                    fill-rule="nonzero"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  delMemWithSubs(memberDetails._id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711v2zm-7 15.5c0-1.267.37-2.447 1-3.448v-6.052c0-.552.447-1 1-1s1 .448 1 1v4.032c.879-.565 1.901-.922 3-1.006v-7.026h-18v18h13.82c-1.124-1.169-1.82-2.753-1.82-4.5zm-7 .5c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1v10zm5 0c0 .552-.447 1-1 1s-1-.448-1-1v-10c0-.552.447-1 1-1s1 .448 1 1v10zm13-.5c0 2.485-2.017 4.5-4.5 4.5s-4.5-2.015-4.5-4.5 2.017-4.5 4.5-4.5 4.5 2.015 4.5 4.5zm-3.086-2.122l-1.414 1.414-1.414-1.414-.707.708 1.414 1.414-1.414 1.414.707.708 1.414-1.414 1.414 1.414.708-.708-1.414-1.414 1.414-1.414-.708-.708z" />
                </svg>
              </button>
            </div>
          </ul>
        </div>

        <div className="subs">
          {!isAddSub && subsDetails.length === 0 ? (
            <h3>No subscriptions for this member</h3>
          ) : (
            !isAddSub && (
              <>
                <SubscriptionsComp
                  subs={subsDetails}
                  key={subsDetails.map((sub) => sub._id)}
                  movies={allMovies}
                />
                {remainingSubs > 0 && (
                  <p>
                    <i onClick={openModal}>
                      {`+ ${remainingSubs} more subscriptions`}{" "}
                    </i>
                    <AllSubsModalComp
                      isOpen={isModalOpen}
                      onClose={closeModal}
                      subs={subsDetails}
                      movies={allMovies}
                    />
                  </p>
                )}
              </>
            )
          )}
          {isAddSub && (
            <div className="addSub">
              <select
                onChange={(e) => {
                  setSubObj({ ...subObj, movieId: e.target.value });
                }}
              >
                <option value="movieid" disabled selected>
                  Select movie
                </option>
                {moviesToSubscribe?.map((mov) => {
                  return (
                    <option key={mov._id} value={mov._id}>
                      {mov.title}
                    </option>
                  );
                })}
              </select>
              <input
                type="date"
                onChange={(e) => {
                  setSubObj({ ...subObj, date: e.target.value });
                }}
              />
              <div className="actions">
                <button onClick={addSub}>Subscribe</button>
                <button onClick={() => setIsAddSub(!isAddSub)}>Go back </button>
              </div>
            </div>
          )}
          {!isAddSub && (
            <div className="actions">
              <button onClick={() => setIsAddSub(!isAddSub)}>
                <svg
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                  stroke-linejoin="round"
                  stroke-miterlimit="1"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m12.002 2c5.518 0 9.998 4.48 9.998 9.998 0 5.517-4.48 9.997-9.998 9.997-5.517 0-9.997-4.48-9.997-9.997 0-5.518 4.48-9.998 9.997-9.998zm-.747 9.25h-3.5c-.414 0-.75.336-.75.75s.336.75.75.75h3.5v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5h3.5c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-3.5v-3.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
                    fill-rule="nonzero"
                  />
                </svg>
                Add subscription
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
