import React from "react";

const Header = ({ title, onBackClick }) => {
  return (
    <header className="header-nav">
      <button
        id="back-button"
        className="header-back-button"
        onClick={onBackClick}
      >
        <i className="fas fa-arrow-left"></i>
      </button>
      <h1 id="header-title" className="header-title">
        {title}
      </h1>
      <div className="header-spacer"></div>
    </header>
  );
};

export default Header;
