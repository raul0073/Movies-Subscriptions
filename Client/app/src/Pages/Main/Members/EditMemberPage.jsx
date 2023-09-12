import React, { useEffect, useState } from "react";
import { useMsgService } from "../../../Services/Alert/msgService";
import "./members.scss";
import { useNavigate, useParams } from "react-router-dom";
import { getAllMembers, getMember } from "../../../Services/DB/membersService";
import SubscriptionsComp from "../../../Components/Subscribers/Subscriptions";
import { validateMemberDetails } from "../../../Services/FormsValidations/formsValidations";
import { updateMember } from "../../../Services/DB/membersService";
import ButtonWithLoadingComp from "../../../Components/Button/ButtonWithLoading";
import secureLocalStorage from "react-secure-storage";

export default function MemberPage() {
  const { MessageDisplay, displayMsg } = useMsgService();
  const [memberDetails, setMemberDetails] = useState();
  const [newMemberDetails, setNewMemberDetails] = useState();
  const [memberId, setMemberId] = useState("");
  const [memberSubscriptions, setMembersSubscriptions] = useState();

  const nav = useNavigate();

  const params = useParams();

  // get country name from 2 digit code
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  // get details from db
  const getMemberDetails = async () => {
    // add function to ghet details from storage first, if does not exists fetch

    let id = params.id;
    setMemberId(id);
    let memberLocalDetails;
    let membersFromLocal = secureLocalStorage.getItem("@secure.m.MEMBERS");

    if (!membersFromLocal) {
      try {
        let data = await getMember(id);
        setMemberDetails(data);
        setNewMemberDetails(data.member);
        setMembersSubscriptions(data.subscriptions);
      } catch (err) {
        displayMsg("fail", "Can't get member's data");
        throw new Error(`Can't get members data from db`);
      }
    } else {
      memberLocalDetails = membersFromLocal.filter(
        (member) => member.member._id === id
      );

      let memDetailsObj = memberLocalDetails[0].member;
      let memSubsObj = memberLocalDetails[0].subscriptions;
      setMemberDetails(memDetailsObj);
      setNewMemberDetails(memDetailsObj);
      setMembersSubscriptions(memSubsObj);
    }
  };

  // function to edit member details
  const updateMem = async () => {
    // validate fileds
    const errorMsg = validateMemberDetails(newMemberDetails);
    if (errorMsg) {
      displayMsg("fail", errorMsg);
    } else {
      await updateMember(memberId, newMemberDetails);
      localStorage.removeItem("@secure.s.MEMBERS");
      let newMembersList = await getAllMembers();
      secureLocalStorage.setItem("MEMBERS", JSON.stringify(newMembersList));
      displayMsg("success", "Member updated successfully");
      setMemberDetails("");
      nav("/members");
    }
  };

  useEffect(() => {
    getMemberDetails();
  }, []);

  return (
    <section className="members">
      <MessageDisplay />
      <div className="member-container">
        <div className="card">
          <div className="art">
            <img src={newMemberDetails?.avatar} alt="member avatar" /> <br />
          </div>
          <div className="header">
            <h3>Edit member details</h3>
          </div>
          {memberDetails ? (
            <>
              <input
                type="text"
                onChange={(e) => {
                  setNewMemberDetails({
                    ...newMemberDetails,
                    name: e.target.value,
                  });
                }}
                value={newMemberDetails.name}
              />
              <input
                type="text"
                onChange={(e) => {
                  setNewMemberDetails({
                    ...newMemberDetails,
                    email: e.target.value,
                  });
                }}
                value={newMemberDetails.email}
              />
              <input
                type="text"
                onChange={(e) => {
                  setNewMemberDetails({
                    ...newMemberDetails,
                    country: e.target.value,
                  });
                }}
                value={regionNames.of(newMemberDetails.country)}
              />
              <input
                type="text"
                onChange={(e) => {
                  setNewMemberDetails({
                    ...newMemberDetails,
                    city: e.target.value,
                  });
                }}
                value={newMemberDetails.city}
              />
              <input
                type="text"
                onChange={(e) => {
                  setNewMemberDetails({
                    ...newMemberDetails,
                    dob: e.target.value,
                  });
                }}
                value={new Date(newMemberDetails.dob).toDateString("he")}
              />
            </>
          ) : (
            <>
              <h2>Something went wrong... try again later</h2>
            </>
          )}
          <SubscriptionsComp
            key={memberSubscriptions?._id}
            subs={memberSubscriptions}
            name={newMemberDetails?.name}
          />

          <div className="btn">
            <ButtonWithLoadingComp action={updateMem} text="Edit member" />
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
