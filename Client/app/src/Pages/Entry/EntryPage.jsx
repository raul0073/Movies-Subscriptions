import React, { useEffect } from "react";
import LoginComp from "../../Components/Login/Login";
import { useMsgService } from "../../Services/Alert/msgService";
import "./entry.scss";
import { useNavigate } from "react-router-dom";

export default function EntryPage() {
  const { displayMsg, MessageDisplay } = useMsgService();
  const nav = useNavigate();

  // check if user is valid
  useEffect(() => {
    let userLocal = localStorage.getItem("isValid");
    if (userLocal) {
      setTimeout(() => {
        displayMsg("success", "redirecting to home page");
        nav("/main");
      }, 1000);
    } else {
      return;
    }
  }, []);

  return (
    <section className="entry">
      <MessageDisplay />
      <LoginComp />
    </section>
  );
}
