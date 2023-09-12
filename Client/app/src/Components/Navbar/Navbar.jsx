import React, { useState, useEffect } from "react";
import "./navbar.scss";
import { useNavigate } from "react-router-dom";

export default function NavbarComp() {
  // bool for when side menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nav = useNavigate();

  const handleMenuOpenAndClose = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // get the center of the screen on scroll to position the side bar
    const handleScroll = () => {
      const navigation = document.querySelector(".navigation");
      if (navigation) {
        const scrollPosition = window.scrollY;
        navigation.style.top = `${0 + scrollPosition / 9.5}%`;
      }
    };

    // scroll event listener
    window.addEventListener("scroll", handleScroll);
    // event listener remove
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className={isMenuOpen ? "navigation close" : "navigation"}>
      <div className="container">
        <div className="menu">
          <button
            onClick={handleMenuOpenAndClose}
            style={{ background: "transparent" }}
          >
            {isMenuOpen ? (
              <svg
                width="64"
                height="65"
                xmlns="http://www.w3.org/2000/svg"
                fill-rule="evenodd"
                clip-rule="evenodd"
              >
                <path d="M12 16c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z" />
              </svg>
            ) : (
              <svg
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m11 16.745c0-.414.336-.75.75-.75h9.5c.414 0 .75.336.75.75s-.336.75-.75.75h-9.5c-.414 0-.75-.336-.75-.75zm-9-5c0-.414.336-.75.75-.75h18.5c.414 0 .75.336.75.75s-.336.75-.75.75h-18.5c-.414 0-.75-.336-.75-.75zm4-5c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75z"
                  fill-rule="nonzero"
                />
              </svg>
            )}
          </button>
          <ul type="none">
            <li onClick={() => nav("/main")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 6.453l9 8.375v9.172h-6v-6h-6v6h-6v-9.172l9-8.375zm12 5.695l-12-11.148-12 11.133 1.361 1.465 10.639-9.868 10.639 9.883 1.361-1.465z" />
              </svg>
            </li>
            <i>Home page</i>
            <li onClick={() => nav("/main/members")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M18.546 1h-13.069l-5.477 8.986v13.014h24v-13.014l-5.454-8.986zm-11.946 2h10.82l4.249 7h-19.335l4.266-7zm-4.6 18v-9h20v9h-20zm3-12l.607-1h12.786l.607 1h-14zm12.787-2h-11.572l.606-1h10.359l.607 1zm-1.215-2h-9.144l.607-1h7.931l.606 1zm-1.572 11h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1z" />
              </svg>
            </li>
            <i>Members page</i>
          </ul>
        </div>
      </div>
    </section>
  );
}
