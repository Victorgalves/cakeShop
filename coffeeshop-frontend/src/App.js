import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import Dashboard from "./Pages/Dashboard/Dashboard";
import ClientList from './Pages/Clients/ClientList';
import ClientForm from './Pages/Clients/ClientForm';
import ProductList from './Pages/Product/ProductList';
import ProductForm from './Pages/Product/ProductForm';
import InventoryList from './Pages/Inventory/InventoryList';
import OrderEvaluationList from './Pages/OrderEvaluation/OrderEvaluationList';
import OrderEvaluationForm from './Pages/OrderEvaluation/OrderEvaluationForm';
const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login"/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/clients" element={<ClientList/>}/>
                <Route path="/clients/novo" element={<ClientForm/>}/>
                <Route path="/clients/editar/:cpf" element={<ClientForm/>}/>
                <Route path="/product" element={<ProductList/>}/>
                <Route path="/products/new" element={<ProductForm/>}/>
                <Route path="/products/edit" element={<ProductForm/>}/>
                <Route path="/inventory" element={<InventoryList />} />
                <Route path="/orderEvaluations" element={<OrderEvaluationList />} />
                <Route path="/orderEvaluations/new" element={<OrderEvaluationForm />} />
                <Route path="*" element={<div>Página não encontrada</div>}/>
            </Routes>
        </Router>
    );
};

export default App;
