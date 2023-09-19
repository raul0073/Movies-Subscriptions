import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./403.scss";
import ErrorIcon from "../../assets/403/ErrorIcon";
import { useMsgService } from "../../Utilities/Alerts/msgService";

export default function AccessErrorPage() {
  const { alertMsg, MessageDisplay } = useMsgService();

  const nav = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      return nav("/");
    }, 4000);
  }, []);

  return (
    <>
      
      <div className="main">
      <MessageDisplay />
        <div className="art">
          <ErrorIcon />
        </div>
        <div className="msg">
          <h2>Where are you going? 🧐</h2>
          <p>You will be redirected to login page shortly</p>
        </div>
      </div>
    </>
  );
}
