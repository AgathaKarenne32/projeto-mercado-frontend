import React from "react";

const BottomNav = ({ activeNav, onNavClick }) => {
  return (
    <nav id="bottom-nav" className="bottom-nav">
      <button
        id="nav-cadastro"
        className="nav-link"
        onClick={() => onNavClick("cadastro")}
      >
        <i
          className={`fas fa-plus nav-icon ${activeNav === "cadastro" ? "active" : ""}`}
        ></i>
        <span className="nav-label">Cadastro</span>
      </button>
      <button
        id="nav-compras"
        className="nav-link"
        onClick={() => onNavClick("compras")}
      >
        <i
          className={`fas fa-shopping-cart nav-icon ${activeNav === "compras" ? "active" : ""}`}
        ></i>
        <span className="nav-label">Compras</span>
      </button>
      <button
        id="nav-relatorios"
        className="nav-link"
        onClick={() => onNavClick("relatorios")}
      >
        <i
          className={`fas fa-file-invoice-dollar nav-icon ${activeNav === "relatorios" ? "active" : ""}`}
        ></i>
        <span className="nav-label">Relatórios</span>
      </button>
    </nav>
  );
};

export default BottomNav;
