// src/Paginas/Home/Home.js
import React from 'react';
import Card from "../../components/Card/Card";
import Menu from "../../components/Menu/Menu";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    return (
        <div className="home-container">
            <Menu />
            <div className="home-content">
                <div className="home-cards">
                    <Card title="Pedidos" />
                    <Link to="/clients"><Card title="Clientes" /></Link>
                    <Card title="Funcionários" />
                    <Card title="Estoque" />
                    <Card title="Produção" />
                    <Link to="/dashboard"><Card title="Dashboard" /></Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
