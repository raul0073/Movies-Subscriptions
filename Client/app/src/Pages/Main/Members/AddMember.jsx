import React, { useEffect, useState } from "react";
import { useMsgService } from "../../../Services/Alert/msgService";
import "./members.scss";
import { useNavigate } from "react-router-dom";
import { addMemeber } from "../../../Services/DB/membersService";
import { validateMemberDetails } from "../../../Services/FormsValidations/formsValidations";
import { getAllCountries } from "../../../Services/WS/countriesService";
import ButtonWithLoadingComp from "../../../Components/Button/ButtonWithLoading";
import { getAllMembers } from "../../../Services/DB/membersService";

export default function AddMemberPage() {
  const nav = useNavigate();
  const [newMemberDetails, setNewMemberDetails] = useState({});
  const [isClickedIcon, setIsClickedIcon] = useState(false);
  const { MessageDisplay, displayMsg } = useMsgService();
  const [countries, setCountries] = useState([]);

  // add member and check inputs with validation function
  const addMem = async () => {
    // validation will return msg if invalid
    const errorMsg = validateMemberDetails(newMemberDetails);

    if (errorMsg) {
      displayMsg("fail", errorMsg);
    } else {
      // if all good
      try {
        newMemberDetails.dob = new Date(newMemberDetails.dob);
        await addMemeber(newMemberDetails);
        localStorage.removeItem("@secure.s.MEMBERS");
        let newMembersList = await getAllMembers();
        secureLocalStorage.setItem("MEMBERS", JSON.stringify(newMembersList));
        displayMsg("success", "Member added to db");
        // setNewMemberDetails("");
      } catch (err) {
        displayMsg("fail", "Error adding new member");
        console.log(err);
      }
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

  // function will get all countries from ws
  const getCountriesForPage = async () => {
    try {
      let countriesList = await getAllCountries();
      setCountries(countriesList);
    } catch (err) {
      displayMsg("fail", `Error getting countries from ws`);
    }
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
            </svg>{" "}
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
                  <option key={index} value={country.code}>
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
            <ButtonWithLoadingComp action={addMem} text="Add member" />
            <button
              style={{ backgroundColor: "grey" }}
              onClick={() => nav("/main/members")}
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
