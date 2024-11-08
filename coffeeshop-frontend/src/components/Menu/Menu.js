// src/components/Menu/Menu.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    return (
        <nav className="navbar">
            <h3 className="navbar-title">Coffee Shop Management</h3>
            <ul className="navbar-list">
                <li className="navbar-item"><Link to="/clientes">Clientes</Link></li>
                <li className="navbar-item"><Link to="/pedidos">Pedidos</Link></li>
                <li className="navbar-item"><Link to="/produtos">Produtos</Link></li>
                <li className="navbar-item"><Link to="/inventario">Estoque</Link></li>
                <li className="navbar-item"><Link to="/financeiro">Funcionários</Link></li>
                <li className="navbar-item"><Link to="/vendas">Vendas</Link></li>
            </ul>
        </nav>
    );
};

export default Menu;
