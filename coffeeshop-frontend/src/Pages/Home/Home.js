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
                    <Link to="/orders"><CardMenu title="Pedidos" /></Link>
                    <Link to="/employees"><CardMenu title="Funcionários" /></Link>
                    <Link to="/dashboard"><CardMenu title="Dashboard" /></Link>
                    <Link to ="/production"><CardMenu title="Produção" /></Link>
                    <Link to="/product"><CardMenu title="Produtos" /></Link>
                    <Link to="/orderEvaluations"><CardMenu title="Avaliações" /></Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
