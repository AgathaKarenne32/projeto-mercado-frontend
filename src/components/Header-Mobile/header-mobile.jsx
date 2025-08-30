import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./header-mobile.css";
import UserMenu from "../userMenu/userMenu";
import { getMe } from "../../services/userService";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function handleMenuToggle() {
    setIsMenuOpen((v) => !v);
  }

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const me = await getMe();
        if (alive) setUser(me);
      } catch {
        // Se preferir, redirecione não autenticado:
        // navigate("/login");
      }
    })();
    return () => {
      alive = false;
    };
  }, [navigate]);

  function handleLogout() {
    // Sua lógica de logout real:
    localStorage.removeItem("token");
    navigate("/login");
  }

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
              to="/dashboard"
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
          <li className="hidden">
            <NavLink
              to="/perfil"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="fas fa-user"></i>
              Perfil
            </NavLink>
          </li>
          <li className="hidden">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <i className="fas fa-sign-out"></i>
              Log-out
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="header-right">
        {user && <UserMenu user={user} onSignOut={handleLogout} />}
      </div>
    </header>
  );
}
