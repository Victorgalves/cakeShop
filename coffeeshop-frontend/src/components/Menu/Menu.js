// src/components/Menu/Menu.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    return (
        <nav className="navbar">
            <Link to="/home" className="navbar-title-link">
                <h3 className="navbar-title">Marcella Costa Cake</h3>
            </Link>
            <ul className="navbar-list">
                <li className="navbar-item"><Link to="/">Sair</Link></li>
            </ul>
        </nav>
    );
};

export default Menu;
