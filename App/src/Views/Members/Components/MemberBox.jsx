import React, { useState, useEffect } from "react";
import SubscriptionsComp from "../../../Components/Subscribers/Subscriptions";
import AllSubsModalComp from "../../../Components/Subscribers/AllSubscriptionModal/SubscriptionsModal";
import { useMsgService } from "../../../Utilities/Alerts/msgService";
import { delMember, getAllMembers } from "../../../Utilities/DB/MembersService";
import mailIcon from "../../../assets/Components/MemberBox/iconmonstr-email-15-32.png";
import birthdayIcon from "../../../assets/Components/MemberBox/iconmonstr-candy-15-32.png";
import locationIcon from "../../../assets/Components/MemberBox/iconmonstr-crosshair-10-32.png";
import { useAtom } from "jotai";
import {
  MembersAtom,
  MoviesAtom,
  StoreVersion,
  MoviesToSubscribeAtom,
} from "../../../Atoms";
import { useNavigate } from "react-router-dom";
import { addSubscriptionToMember } from "../../../Utilities/DB/SubscriptionsService";
import "./Styles/memberbox.scss";
import "../Styles/members.scss";
import DeleteIcon from "../../../assets/Components/MemberBox/DeleteIcon";
import EditIcon from "../../../assets/Components/MemberBox/EditIcon";
import AddSubscriptionIcon from "../../../assets/Components/MemberBox/AddSubscriptionIcon";

export default function MemberBox({ memberDetails, subsDetails }) {
  // msg display service
  const { MessageDisplay, alertMsg } = useMsgService();
  const nav = useNavigate();
  // bool for is add sub page
  const [isAddSub, setIsAddSub] = useState(false);
  // initailize sub obj
  const [subObj, setSubObj] = useState({
    memberId: memberDetails._id,
    memberName: memberDetails.name,
  });
  // filtered movies list for each member
  const [moviesListForMember, setMoviesListForMember] =
    useState(MoviesToSubscribeAtom);
  const [moviesListAtom, setMoviesListAtom] = useAtom(MoviesAtom);
  const [membersAtomList, setMembersAtomList] = useAtom(MembersAtom);
  const [sortedSubs, setSortedSubs] = useState(subsDetails);
  const [storeV, setStoreV] = useAtom(StoreVersion);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // know when to show 'see more subs'
  const remainingSubs = subsDetails.length - 4;

  // add subscription to member
  const addSub = async () => {
    try {
      // add movie name
      subObj.movieName = subsDetails.movieName;
      let updatedData = await addSubscriptionToMember(subObj);
      // update members atom
      setMembersAtomList(updatedData.members);
      // remove from atom
      const updatedMoviesList = moviesListAtom.map((movie) => {
        if (movie._id === subObj.movieId) {
          const subscribersList = movie.subscribers || [];
          return {
            ...movie,
            subscribers: [...subscribersList, updatedData.subObjForMovie],
          };
        }
        return movie;
      });
      // set atom movies to updated movies list
      setMoviesListAtom(updatedMoviesList);
      // update version for re rendering of data in all members
      setStoreV((preVersion) => preVersion + 1);

      handleAddNewSub(memberDetails._id);
      alertMsg("success", "Subscription added successfully");
    } catch (err) {
      alertMsg("fail", "Failed to subscribe member to movie", console.log(err));
    }
  };

  const filterMoviesByMemberId = (id) => {
    const selectedMovies = moviesListAtom?.filter((movie) => {
      return !movie?.subscribers?.some(
        (subscriber) => subscriber.memberId === id
      );
    });

    // Set the filtered movies
    setMoviesListForMember(selectedMovies);
  };

  // delete member
  const delMemWithSubs = async (id) => {
    try {
      if (window.confirm("Delete Member?")) {
        let resp = await delMember(id);
        setMembersAtomList(resp.members);
        setMoviesListAtom(resp.movies);
        setStoreV((preVersion) => preVersion + 1);
        alertMsg(
          "success",
          `${resp.msg} \n You will be redirected to the home page`
        );
        // redirect to the main page
        setTimeout(() => {
          nav("/home");
        }, 1000);
      } else {
        // member was found
        alertMsg("fail", "Error, member not found");
      }
      // other problems
    } catch (err) {
      alertMsg("fail", "Error, can't delete member", console.log(err));
    }
  };

  // open add sub view
  const handleAddNewSub = (id) => {
    setIsAddSub(!isAddSub);
    filterMoviesByMemberId(id);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    filterMoviesByMemberId(memberDetails._id);
  }, [storeV]);

  return (
    <>
      <MessageDisplay />
      <section className="members">
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
                    nav(`/home/members/edit/${memberDetails._id}`);
                  }}
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => {
                    delMemWithSubs(memberDetails._id);
                  }}
                >
                  <DeleteIcon />
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
                    movies={moviesListAtom}
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
                        movies={moviesListAtom}
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
                  {moviesListForMember?.map((mov) => {
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
                  <button onClick={() => setIsAddSub(!isAddSub)}>
                    Go back{" "}
                  </button>
                </div>
              </div>
            )}
            {!isAddSub && (
              <div className="actions">
                <button onClick={() => handleAddNewSub(memberDetails._id)}>
                  <AddSubscriptionIcon />
                  Add subscription
                </button>
              </div>
            )}
          </div>
        </section>
      </section>
    </>
  );
}
