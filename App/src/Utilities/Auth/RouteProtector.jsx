import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getFromLocalStorage,
  setInLocalStorage,
} from "../SecureStorage/StorageService";

export default function PrivateRoute({ children, verifyUser }) {
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userVerified = verifyUser();
  useEffect(() => {
    
    setIsLoggedIn(userVerified);
    if (!userVerified) {
      nav("/403");
    }
  }, [verifyUser, nav]);

  return isLoggedIn ? children : nav("/403");
}

export const verifyUser = () => {
  // Check if there's a session object in sessionStorage
  let sessionObj = sessionStorage.getItem("SESSION");
  sessionObj = JSON.parse(sessionObj)

  if (sessionObj && sessionObj.token) {
    return true; // User is verified
  }

  // If there's no session object in sessionStorage, check localStorage for remember
  const rememberMeObj = getFromLocalStorage("REMEMBER");
  if (rememberMeObj && rememberMeObj.token) {

    return true; 
  }

  return false;
}