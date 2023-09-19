import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/logo3.png";
import LogoutIcon from "../../assets/Components/Topbar/logout";
import MenuOpenIcon from "../../assets/Components/Topbar/MenuOpenIcon";
import MenuClosedIcon from "../../assets/Components/Topbar/MenuClosedIcon";
import HomeIcon from "../../assets/Components/Topbar/HomeIcon";
import SubscriptionIcon from "../../assets/Components/Topbar/SubscriptionIcon";
import "./topbar.scss";
import { getFromLocalStorage } from "../../Utilities/SecureStorage/StorageService";

export default function TopbarComp() {
  const nav = useNavigate();
  const [userName, setUserName] = useState();
  const loc = useLocation();
  const [isManager, setIsManager] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    // force storage update on browser
    return (window.location.href = "/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuPopupClass = isMenuOpen ? "menu-popup open" : "menu-popup";

  useEffect(() => {
    let sessionObj = sessionStorage.getItem("SESSION");
    if (!sessionObj) {
      let localData = getFromLocalStorage("REMEMBER");
      if (!localData) {
        setUserName("Guest");
      } else {
        setUserName(localData.name);
      }
    } else {
      sessionObj = JSON.parse(sessionObj);
      sessionObj.isManager === true ? setIsManager(true) : setIsManager(false);
      setUserName(sessionObj.name);
    }
  }, []);

  return (
    <section className="top-bar">
      <div className="logo">
        <img src={logo} alt="" onClick={() => nav("/home")} />
      </div>
      <div className="account">
        <p>{userName}</p>
        {!loc.pathname.includes("member") && (
          <button
            onClick={() => {
              nav("/home/movie/add");
            }}
          >
            Add Movie
          </button>
        )}
        {loc.pathname.includes("members") && isManager && (
          <button
            onClick={() => {
              nav("/home/members/add");
            }}
          >
            Add Member
          </button>
        )}

        <div className="menu-container" onClick={toggleMenu}>
          {!isMenuOpen ? (
            <MenuClosedIcon onClick={toggleMenu} />
          ) : (
            <MenuOpenIcon onClick={toggleMenu} />
          )}
          {isMenuOpen && (
            <div className={menuPopupClass}>
              <legend>Navigation &#8594;</legend>
              <ul>
                <li onClick={() => nav("/home")}>
                  <HomeIcon />
                  <span>Movies</span>
                </li>
                <li onClick={() => nav("/home/members")}>
                  {/* Add your SVG and text here */}
                  <SubscriptionIcon />
                  <span>Members</span>
                </li>
                {/* Add more menu items as needed */}
                <li onClick={handleLogout}>
                  <LogoutIcon />
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
