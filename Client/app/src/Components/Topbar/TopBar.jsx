import React, { useEffect, useState } from "react";
import "./topbar.scss";
import logo from "../../assets/logo3.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function TopBarComp() {
  const nav = useNavigate();
  const [userName, setUserName] = useState("Guest");
  const loc = useLocation();

  const hadleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    nav("/");
  };

  useEffect(() => {
    let name = sessionStorage.getItem("SESSION");
    let localName = localStorage.getItem("isValid");
    if (!name && !localName) {
      return;
    }
    if (name) {
      name = JSON.parse(name);
      setUserName(name.name);
    } else {
      localName = JSON.parse(localName);
      setUserName(localName.name);
    }
  }, []);

  return (
    <section className="top-bar">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="account">
        <p>{userName}</p>

        {!loc.pathname.includes("member") && (
          <button
            onClick={() => {
              nav("/main/movie/add");
            }}
          >
            Add Movie
          </button>
        )}

        {loc.pathname.includes("member") && (
          <button
            onClick={() => {
              nav("/main/member/add");
            }}
          >
            Add Member
          </button>
        )}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          onClick={hadleLogout}
        >
          <path d="M16 12.771h-3.091c-.542 0-.82-.188-1.055-.513l-1.244-1.674-2.029 2.199 1.008 1.562c.347.548.373.922.373 1.42v4.235h-1.962v-3.981c-.016-1.1-1.695-2.143-2.313-1.253l-1.176 1.659c-.261.372-.706.498-1.139.498h-3.372v-1.906l2.532-.001c.397 0 .741-.14.928-.586l1.126-2.75c.196-.41.46-.782.782-1.102l2.625-2.6-.741-.647c-.223-.195-.521-.277-.812-.227l-2.181.381-.342-1.599 2.992-.571c.561-.107 1.042.075 1.461.462l2.882 2.66c.456.414.924 1.136 1.654 2.215.135.199.323.477.766.477h2.328v1.642zm-2.982-5.042c1.02-.195 1.688-1.182 1.493-2.201-.172-.901-.96-1.528-1.845-1.528-1.186 0-2.07 1.078-1.85 2.234.196 1.021 1.181 1.69 2.202 1.495zm4.982-5.729v15l6 5v-20h-6z" />
        </svg>
      </div>
    </section>
  );
}
