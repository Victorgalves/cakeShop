import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Paginas/Login/Login';
import Home from './Paginas/Home/Home';
import Dashboard from "./Paginas/Dashboard/Dashboard";

const App = () => {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />

                <Route path="/home" element={<Home />} />

                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="*" element={<div>Página não encontrada</div>} />
            </Routes>
        </Router>
    );
};

export default App;
