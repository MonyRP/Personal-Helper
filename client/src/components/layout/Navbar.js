import React from "react";

const Navbar = () => {
  return (
    <div className="navbar navbar-expand-lg fixed-top py-4 navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarDropdown">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarDropdown">
          <ul className="nav navbar-nav nav-pills ml-auto">
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/faq">FAQ</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
