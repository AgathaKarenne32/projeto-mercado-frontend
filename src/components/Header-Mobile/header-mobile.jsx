import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./header-mobile.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo-section">
        <div className="logo">
          <i className="fas fa-file-invoice-dollar"></i>
        </div>
        <h1 className="logo-text">Nome Projeto</h1>
      </div>

      <button className="menu-toggle" onClick={handleMenuToggle}>
        <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
      </button>

      <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
        <ul className="nav-list">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="fas fa-chart-line"></i>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/compras"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="fas fa-shopping-cart"></i>
              Compras
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/rascunhos"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="fas fa-pencil-alt"></i>
              Rascunhos
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/meus-relatorios"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="fas fa-file-alt"></i>
              Meus Relatórios
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/relatorios"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i class="fa-solid fa-users"></i>
              Relatórios Gerais
            </NavLink>
          </li>
        </ul>
      </nav>

      <button className="login-button">
        <i className="fas fa-sign-out-alt"></i>
        Logout
      </button>
    </header>
  );
};

export default Header;
