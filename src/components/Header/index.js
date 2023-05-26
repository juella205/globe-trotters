import React from "react";
import './Header.css';

function Header({ handlePageChange }) {
  return (
    <header className="header">
      <h1>Globetrotter's Guide</h1>
      <nav>
        <ul>
          <li>
            <a onClick={() => handlePageChange("About")}>Home</a>
          </li>
          <li>
            <a onClick={() => handlePageChange("")}>Log In</a>
          </li>
          <li>
            <a onClick={() => handlePageChange("")}></a>
          </li>
          <li>
            <a onClick={() => handlePageChange("Contact")}>Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
