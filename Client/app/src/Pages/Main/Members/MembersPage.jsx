import React, { useEffect, useState } from "react";
import { getAllMembers } from "../../../Services/DB/membersService";
import { useMsgService } from "../../../Services/Alert/msgService";
import MemberBox from "../../../Components/MembersBox/MemberBox";
import secureLocalStorage from "react-secure-storage";

export default function MembersPage() {
  const [membersList, setMembersList] = useState([]);

  const { MessageDisplay, displayMsg } = useMsgService();

  const getMembersData = async () => {
    try {
      let membersLocal = secureLocalStorage.getItem("@secure.m.MEMBERS");
      if (!membersLocal) {
        let membersData = await getAllMembers();
        secureLocalStorage.setItem("MEMBERS", JSON.stringify(membersData));
        // Extract members and subscriptions separately
        setMembersList(membersData);
      } else {
        let membersData = getMembersDataFromLocalStorage();
        setMembersList(membersData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMembersData();
  }, []);

  return (
    <>
      <section className="members">
        <MessageDisplay />
        <div className="members-container">
          {membersList.map((data, index) => (
            <div className="box" key={data.member._id}>
              <MemberBox
                key={data.member._id}
                memberDetails={data.member}
                subsDetails={data.subscriptions}
                getAllMembers={getMembersData}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
