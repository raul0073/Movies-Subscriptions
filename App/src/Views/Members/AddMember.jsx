import React, { useState, useEffect } from "react";
import { useMsgService } from "./../../Utilities/Alerts/msgService";
import { addMember } from "../../Utilities/DB/MembersService";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { MembersAtom, StoreVersion } from "../../Atoms";
import { getAllCountries } from "../../Utilities/WS/RestCountriesService";
import ButtonWithLoading from "../../Components/Button/ButtonWithLoading";
import { validateMemberDetails } from "../../Utilities/Forms/FormsValidation";
import "./Styles/members.scss";
import AddMemberIcom from "../../assets/Members/AddMemberIcom";

export default function AddMemberPage() {
  const nav = useNavigate();
  const { MessageDisplay, alertMsg } = useMsgService();
  const [membersListAtom, setMembersListAtom] = useAtom(MembersAtom);
  const [storeV, setStoreV] = useAtom(StoreVersion);
  const [newMemberDetails, setNewMemberDetails] = useState({});
  const [isClickedIcon, setIsClickedIcon] = useState(false);
  const [countries, setCountries] = useState([]);

  // add member and check inputs with validation function and will update all members data source
  const addMem = async () => {
    // validation will return msg if invalid
    const errorMsg = validateMemberDetails(newMemberDetails);
    if (errorMsg) {
      displayMsg("fail", errorMsg);
    } else {
      // if all good
      try {
        newMemberDetails.dob = new Date(newMemberDetails.dob);
        let resp = await addMember(newMemberDetails);
        let newMember = resp
        // update storage
        setMembersListAtom((preState) => [...preState, newMember]);
        // Increment the version
        setStoreV((prevVersion) => prevVersion + 1);
        alertMsg("success", "Member added to db");
      } catch (err) {
        alertMsg("fail", "Error adding new member");
        console.log(err);
      }
    }
  };

  // function will get all countries from ws
  const getCountriesForPage = async () => {
    try {
      let countriesList = await getAllCountries();
      setCountries(countriesList);
    } catch (err) {
      displayMsg("fail", `Error getting countries from ws`);
    }
  };

  // function to set selected avatar
  const handleAvatarClick = (e, avatarUrl) => {
    e.target.className.includes("selected")
      ? (e.target.className = "")
      : (e.target.className = "selected");
    setNewMemberDetails({
      ...newMemberDetails,
      avatar: avatarUrl,
    });
    setIsClickedIcon(true);
  };

  useEffect(() => {
    getCountriesForPage();
  }, []);

  return (
    <section className="members">
      <MessageDisplay />
      <div className="member-container">
        <div className="card">
          <div className="art">
            <AddMemberIcom />{" "}
          </div>
          <div className="header">
            <h3>Enter member details</h3>
          </div>
          <input
            required
            type="text"
            onChange={(e) => {
              setNewMemberDetails({
                ...newMemberDetails,
                name: e.target.value,
              });
            }}
            placeholder="Name"
          />
          <input
            type="email"
            required
            onChange={(e) => {
              setNewMemberDetails({
                ...newMemberDetails,
                email: e.target.value,
              });
            }}
            placeholder="Email"
          />
          <select
            onChange={(e) => {
              setNewMemberDetails({
                ...newMemberDetails,
                country: e.target.value,
              });
            }}
            required
          >
            <option disabled selected>
              Select your country
            </option>
            {countries.map((country, index) => {
              return (
                <>
                  <option key={index} value={country.code.toLowerCase()}>
                    {country.flag} {""}
                    {country.name}
                  </option>
                </>
              );
            })}
          </select>
          <input
            required
            type="text"
            onChange={(e) => {
              setNewMemberDetails({
                ...newMemberDetails,
                city: e.target.value,
              });
            }}
            placeholder="City"
          />
          <input
            required
            type="date"
            onChange={(e) => {
              setNewMemberDetails({ ...newMemberDetails, dob: e.target.value });
            }}
            placeholder="DOB"
          />
          <div className="dropdown">
            Select Avatar
            <div className="dropdownList">
              <ul>
                <li
                  onClick={(e) =>
                    handleAvatarClick(
                      e,
                      "https://img.freepik.com/premium-vector/avatar-man-with-beard-office-worker-creative-team-young-student-brown-hair_277909-134.jpg?w=2000"
                    )
                  }
                >
                  <img src="https://img.freepik.com/premium-vector/avatar-man-with-beard-office-worker-creative-team-young-student-brown-hair_277909-134.jpg?w=2000" />
                </li>
                <li
                  onClick={(e) =>
                    handleAvatarClick(
                      e,
                      "https://static.vecteezy.com/system/resources/thumbnails/002/002/297/small_2x/beautiful-woman-avatar-character-icon-free-vector.jpg"
                    )
                  }
                >
                  <img src="https://static.vecteezy.com/system/resources/thumbnails/002/002/297/small_2x/beautiful-woman-avatar-character-icon-free-vector.jpg" />
                </li>
                <li
                  onClick={(e) =>
                    handleAvatarClick(
                      e,
                      "https://static.vecteezy.com/system/resources/previews/002/002/427/original/man-avatar-character-isolated-icon-free-vector.jpg"
                    )
                  }
                >
                  <img src="https://static.vecteezy.com/system/resources/previews/002/002/427/original/man-avatar-character-isolated-icon-free-vector.jpg" />
                </li>
                <li
                  onClick={(e) =>
                    handleAvatarClick(
                      e,
                      "https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg"
                    )
                  }
                >
                  <img src="https://static.vecteezy.com/system/resources/thumbnails/001/993/889/small_2x/beautiful-latin-woman-avatar-character-icon-free-vector.jpg" />
                </li>
              </ul>
            </div>
          </div>
          <div className="btn">
            <ButtonWithLoading action={addMem} text="Add member" />
            <button
              style={{ backgroundColor: "grey" }}
              onClick={() => nav("/home/members")}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
