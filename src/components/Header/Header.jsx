import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import UserMenu from "../userMenu/userMenu";
import './Header.css';

const Header = () => {
    const { authData, logout } = useAuth();

    return (
        <header className="header">
            <div className="logo-section">
                <div className="logo">
                    <i className="fas fa-file-invoice-dollar"></i>
                </div>
                <h1 className="logo-text">Compras Fácil</h1>
            </div>

            <nav className="nav">
                <ul className="nav-list">
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                            <i className="fas fa-chart-line"></i>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/compras" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                            <i className="fas fa-shopping-cart"></i>
                            Compras
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/rascunhos" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                            <i className='fas fa-pencil-alt'></i>
                            Rascunhos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/relatorios" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                            <i className="fas fa-file-alt"></i>
                            Relatórios
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="header-actions">
                <UserMenu
                    user={authData?.user}
                    onSignOut={logout}
                />
            </div>
        </header>
    );
};

export default Header;