import React, { useState, useEffect } from 'react';
import Card from "../../components/Card/Card";
import Menu from "../../components/Menu/Menu";
import "./Home.css";
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className="home-container">
            <Menu />
            <div className="home-content">
                <div className="home-cards">
                    <Card title="Pedidos" />
                    <Card title="Clientes" />
                    <Card title="Funcionários" />
                    <Card title="Estoque" />
                    <Card title="Produção" />
                   <Link to="/dashboard" ><Card title="Dashboard" /></Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
