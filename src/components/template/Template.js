import React from "react";
import NavBar from "../header/NavBar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

function Template() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Template;
