// src/components/Menu/Menu.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    return (
        <nav className="navbar">
            <h3 className="navbar-title">Coffee Shop Management</h3>
            <ul className="navbar-list">
                <li className="navbar-item"><Link to="/">Sair</Link></li>
            </ul>
        </nav>
    );
};

export default Menu;
