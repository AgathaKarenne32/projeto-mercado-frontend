import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo-section">
                <div className="logo">
                    <i className="fas fa-file-invoice-dollar"></i>
                </div>
                <h1 className="logo-text">Nome Projeto</h1>
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
                        <NavLink to="/purchase" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                            <i className="fas fa-shopping-cart"></i>
                            Compras
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/drafts" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                            <i className='fas fa-pencil-alt'></i>
                            Rascunhos
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/reports" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
                            <i className="fas fa-file-alt"></i>
                            Relatórios
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
