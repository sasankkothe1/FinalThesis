import React from "react";
import logo from "../../Assests/logo.png";
import "./header.css";

export default function Header() {
  console.log(logo);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <a href="/">
            <img className="logo-image" src={logo} alt="home" />
          </a>
        </div>
        <div className="header-nav">
          <button className="header-nav-buttons">About</button>
          <button className="header-nav-buttons">Problem Sets</button>
          <button className="header-nav-buttons">How to</button>
          <button className="header-nav-buttons">Upload Solutions</button>
        </div>
      </div>
    </header>
  );
}
