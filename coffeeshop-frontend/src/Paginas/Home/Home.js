import React from 'react';
import CardMenu from "../../components/CardMenu/CardMenu";
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
                    <Link to="/clients"><CardMenu title="Clientes" /></Link>
                    <CardMenu title="Pedidos" />
                    <CardMenu title="Funcionários" />
                    <Link to="/dashboard"><CardMenu title="Dashboard" /></Link>
                    <CardMenu title="Produção" />
                    <CardMenu title="Produtos" />
                </div>
            </div>
        </div>
    );
};

export default Home;
