import React from "react";
import NavbarComp from "../../Components/Navbar/Navbar";
import "./mainpage.scss";
import TopBarComp from "../../Components/Topbar/TopBar";
import {Outlet} from "react-router-dom";

export default function MainPage() {
 

  return (
    <>
      <main className="main-feed">
      <TopBarComp />
      <NavbarComp />
        <Outlet />     
      </main>
    </>
  );
}
