// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Paginas/Login/Login';
import Home from './Paginas/Home/Home';
import Dashboard from "./Paginas/Dashboard/Dashboard";
import ClientList from './Paginas/Clients/ClientList';
import ClientForm from './Paginas/Clients/ClientForm';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clients" element={<ClientList />} />
                <Route path="/clients/novo" element={<ClientForm />} />
                <Route path="/clients/editar/:cpf" element={<ClientForm />} />
                <Route path="*" element={<div>Página não encontrada</div>} />
            </Routes>
        </Router>
    );
};

export default App;
