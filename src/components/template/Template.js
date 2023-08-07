import React from "react";
import NavBar from "../header/NavBar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

function Template() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Template;
