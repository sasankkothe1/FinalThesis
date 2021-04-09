import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../Assests/logo.png";
import "./header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <a href="/">
            <img className="logo-image" src={logo} alt="home" />
          </a>
        </div>
        <div className="header-nav">
          <NavLink
            exact
            className="header-nav-buttons"
            activeClassName="active-button"
            to={"/"}
          >
            About
          </NavLink>
          <NavLink
            exact
            className="header-nav-buttons"
            activeClassName="active-button"
            to={"/ProblemSets"}
          >
            Problem Sets
          </NavLink>
          <NavLink
            exact
            className="header-nav-buttons"
            activeClassName="active-button"
            to={"/HowTo"}
          >
            How to
          </NavLink>
          <NavLink
            exact
            className="upload-solution"
            activeClassName="active-upload-solution"
            to={"/UploadSolutions"}
          >
            Upload Solutions
          </NavLink>
        </div>
      </div>
    </header>
  );
}
