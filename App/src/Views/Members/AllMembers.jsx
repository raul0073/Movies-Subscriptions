import React, { useEffect, useState } from "react";
import { getAllMembers } from "../../Utilities/DB/MembersService";
import { useMsgService } from "../../Utilities/Alerts/msgService";
import { useAtom } from "jotai";
import { MembersAtom, StoreVersion } from "../../Atoms";
import './Styles/members.scss'
import MemberBox from "./Components/MemberBox";

export default function AllMembersPage() {
  const [membersListFromAPI, setMembersListFromAPI] = useState([]);
  const { MessageDisplay, alertMsg } = useMsgService();
  const [membersListAtom, setMembersListAtom] = useAtom(MembersAtom);
  const [storeV] = useAtom(StoreVersion)


  const getMembersData = async () => {
    try {
      let membersData = await getAllMembers();
      console.log("FROM SERVER");
      setMembersListAtom(membersData);
      setMembersListFromAPI(membersData);
      // setInLocalStorage("MEMBERS", membersData)
    } catch (err) {
      alertMsg("fail", "cant get members", console.log(err));
    }
  };

  useEffect(() => {
    if(membersListAtom && membersListAtom.length > 0){
      setMembersListFromAPI(membersListAtom)
      console.log("FROM LOCAL");
    } else {
      getMembersData();
    }
  }, [storeV]);

  return (
    <>
      <section className="members">
        <MessageDisplay />
        <div className="members-container">
          {membersListFromAPI?.map((data, index) => (
            <div className="box" key={data.member._id}>
              <MemberBox
                key={data?.member._id}
                memberDetails={data?.member}
                subsDetails={data?.subscriptions}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
