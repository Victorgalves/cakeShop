import React from 'react';
import Card from "../../components/Card/Card";
import Menu from "../../components/Menu/Menu";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const nome = localStorage.getItem('nome') || 'Usuário'; // Recupera o nome do localStorage

    return (
        <div className="home-container">
            <Menu />
            <div className="home-content">
                <div className="welcome-message">
                    <h2>Olá, {nome}! </h2>
                </div>
                <div className="home-cards">
                    <Link to="/clients"><Card title="Clientes" /></Link>
                    <Card title="Pedidos" />
                    <Card title="Funcionários" />
                    <Link to="/dashboard"><Card title="Dashboard" /></Link>
                    <Card title="Produção" />
                    <Card title="Estoque" />
                </div>
            </div>
        </div>
    );
};

export default Home;
