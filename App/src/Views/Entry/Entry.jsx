import React, { useEffect } from "react";
import LoginComp from "./Components/Login";
import { useMsgService } from "../../Utilities/Alerts/msgService";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage } from "../../Utilities/SecureStorage/StorageService";
import "./entry.scss";

export default function EntryPage() {
    const { alertMsg, MessageDisplay } = useMsgService();
    const nav = useNavigate();
    
  // If not found in session storage, check local storage

    // check if user is valid
    useEffect(() => {
      setTimeout(()=> {
      const userLocal = getFromLocalStorage("REMEMBER");
      if(!userLocal){
       return nav('/')
      }else {
        
        return nav('/home')
      }
      },1000)
    }, []);
  
    return (
      <section className="entry">
        <MessageDisplay />
        <LoginComp />
      </section>
    );
}

