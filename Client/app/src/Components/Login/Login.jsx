import React, { useEffect, useState } from "react";
import { loginUser } from "../../Services/DB/userService";
import { useMsgService } from "../../Services/Alert/msgService";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import ForgotPasswordComp from "./ForgotPassword/ForgotPassword";

export default function LoginComp() {
  // login obj
  const [userData, setUserData] = useState({});

  // forgot email page bol
  const [isFrogotPage, setIsForgotPage] = useState();
  const [rememberMe, setRememberMe] = useState(false);

  // alert msg
  const { displayMsg, MessageDisplay } = useMsgService();
  // navigation
  const nav = useNavigate();

  // handle login
  const handleLogin = async () => {
    try {
      // if none given
      if (!userData.email || !userData.password) {
        displayMsg("fail", "Please fill in both email and password.");
        return;
      }
      // we user is found, save token
      let user = await loginUser(userData.email, userData.password);
      // save token in session storage
      let sessionObj = {
        name: user.name,
        token: user.token,
      };
      sessionStorage.setItem("SESSION", JSON.stringify(sessionObj));

      if (rememberMe) {
        let rememberMeObj = {
          remember: true,
          token: user.token,
          name: user.name,
          date: new Date(),
        };
        localStorage.setItem("isValid", JSON.stringify(rememberMeObj));
      }

      // display success message and redirect after 2s
      displayMsg(
        "success",
        "Login success, you will be redirected to the home page."
      );

      setTimeout(() => {
        nav("/main");
      }, 500);
    } catch (err) {
      console.error("Error during login:", err);
      // this does not work
      if (err.response && err.response.status === 401) {
        displayMsg("fail", "Incorrect email or password.");
        return;
        // BUGGGG !!!! on errro always return this
      } else {
        displayMsg(
          "fail",
          "Something went wrong... double check login details"
        );
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="65"
                  height="65"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.753 18.305c-.261-.586-.789-.991-1.871-1.241-2.293-.529-4.428-.993-3.393-2.945 3.145-5.942.833-9.119-2.489-9.119-3.388 0-5.644 3.299-2.489 9.119 1.066 1.964-1.148 2.427-3.393 2.945-1.084.25-1.608.658-1.867 1.246-1.405-1.723-2.251-3.919-2.251-6.31 0-5.514 4.486-10 10-10s10 4.486 10 10c0 2.389-.845 4.583-2.247 6.305z" />
                </svg>{" "}
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
                <button onTouchEnd={handleLogin} onClick={handleLogin}>
                  Continue
                </button>
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
