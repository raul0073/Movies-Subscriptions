import React, { useState } from "react";
import {
  getFromLocalStorage,
  setInLocalStorage,
} from "../../../Utilities/SecureStorage/StorageService";
import { useMsgService } from "../../../Utilities/Alerts/msgService";
import { useNavigate } from "react-router-dom";
import LoginIcon from "../../../assets/Components/Login/loginIcon";
import ForgotPasswordComp from "./ForgotPassword";
import "./login.scss";
import { loginUser } from "../../../Utilities/DB/UsersService";

export default function LoginComp() {
  // login obj
  const [userData, setUserData] = useState({});

  // forgot email page bol
  const [isFrogotPage, setIsForgotPage] = useState();
  const [rememberMe, setRememberMe] = useState(false);

  // alert msg
  const { alertMsg, MessageDisplay } = useMsgService();
  // navigation
  const nav = useNavigate();

  // handle login
  const handleLogin = async () => {
    // if none given
    if (!userData.email || !userData.password) {
      alertMsg("fail", "Please fill in both email and password.");
    } else {
      try {
        // we user is found, save token
        let user = await loginUser(userData.email, userData.password);
        // save token in session storage
        let sessionObj = {
          name: user.name,
          token: user.token,
          isManager: user.isManager,
        };
        sessionStorage.setItem("SESSION", JSON.stringify(sessionObj));

        if (rememberMe) {
          let rememberMeObj = {
            remember: true,
            token: user.token,
            name: user.name,
            date: new Date(),
          };
          setInLocalStorage("REMEMBER", rememberMeObj);
        }

        // display success message and redirect after 2s
        alertMsg(
          "success",
          "Login success, you will be redirected to the home page."
        );
        setTimeout(() => {
          nav("/home");
        }, 1000);
      } catch (err) {
        alertMsg('fail', err)
      }
    }
  };

  return (
    <section className="login">
      <MessageDisplay />
      <div className="container">
        <div className="card">
          {/* forgot page will appear on click and will change the bol */}
          {!isFrogotPage && (
            <>
              <div className="art">
                <LoginIcon />
              </div>
              <div className="header">
                <h2>Sign in to your account</h2>
              </div>
              <input
                type="text"
                placeholder="Email"
                required
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                }}
              />
              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
              />
              <div className="remember">
                <input
                  id="remember"
                  type="checkbox"
                  value="true"
                  onChange={(e) => {
                    setRememberMe(e.target.checked);
                  }}
                />
                <p>
                  <i>Remember me? </i>
                </p>
                <br />
              </div>

              <p>
                <a onClick={() => setIsForgotPage(!isFrogotPage)}>
                  Forgot password?{" "}
                </a>
              </p>
              <div className="btn">
                <button onClick={handleLogin}>Continue</button>
              </div>
            </>
          )}
          {/* forgot email view from here */}
          {isFrogotPage && (
            <ForgotPasswordComp
              callback={() => setIsForgotPage(!isFrogotPage)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
