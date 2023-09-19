import React, { useEffect } from "react";
import "./homepage.scss";
import { Outlet, useNavigate } from "react-router-dom";
import TopbarComp from "../../Components/Topbar/Topbar";

export default function HomePage() {

  return (
    <>
      <TopbarComp />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}
