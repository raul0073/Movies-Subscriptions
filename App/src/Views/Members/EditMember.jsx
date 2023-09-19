import React, { useEffect, useState } from "react";
import { useMsgService } from "../../Utilities/Alerts/msgService";
import { useNavigate, useParams } from "react-router-dom";
import { MembersAtom } from "../../Atoms";
import { useAtom } from "jotai";
import SubscriptionsComp from "../../Components/Subscribers/Subscriptions";
import ButtonWithLoading from "../../Components/Button/ButtonWithLoading";
import { updateMember, getMember } from "../../Utilities/DB/MembersService";

export default function EditMemberPage() {
  const { MessageDisplay, alertMsg } = useMsgService();
  const [memberDetails, setMemberDetails] = useState({});
  const [membersAtomList, setMembersAtomList] = useAtom(MembersAtom);
  const [newMemberDetails, setNewMemberDetails] = useState({});
  const [memberSubscriptions, setMembersSubscriptions] = useState();
  const nav = useNavigate();
  const params = useParams();

  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  // get details from db
  const getMemberDetails = async () => {
    let { id } = params;
    // add function to ghet details from storage first, if does not exists fetch
    if (membersAtomList && membersAtomList.length > 0) {
      const thisMember = membersAtomList.filter(
        (member) => member.member._id === id
      );
      setMemberDetails(thisMember[0].member);
      setNewMemberDetails(thisMember[0].member);
      setMembersSubscriptions(thisMember[0].subscriptions);
    } else {
      try {
        let data = await getMember(id);
        setMemberDetails(data);
        setNewMemberDetails(data.member);
        setMembersSubscriptions(data.subscriptions);
      } catch (err) {
        alertMsg("fail", "something went wrong... cannot get members details", console.log(err));
      }
    }
  };

  // function to edit member details
  const updateMem = async () => {
    // validate fileds
    const errorMsg = validateMemberDetails(newMemberDetails);
    if (errorMsg) {
      alertMsg("fail", errorMsg);
    } else {
      await updateMember(memberId, newMemberDetails);
      setMembersAtomList((preState) => [preState, newMemberDetails]);

      alertMsg("success", "Member updated successfully");
      setMemberDetails("");
      nav("/home/members");
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
                // value={regionNames.of(newMemberDetails.country.toString())}
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
            <ButtonWithLoading action={updateMem} text="Edit member" />
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
