// src/components/Dashboard/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../../services/DashboardService';
import Card from '../../components/Card/Card';
import Menu from '../../components/Menu/Menu';
import SalesChart from '../../components/SalesChart/SalesChart';  // Importe o componente do gráfico
import './Dashboard.css';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDashboardData();
                setDashboardData(data);
            } catch (error) {
                console.error("Error loading dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    if (!dashboardData) {
        return <p>Loading...</p>;
    }

    // Suponhamos que você tenha as vendas diárias no formato de dados para o gráfico:
    const salesData = dashboardData.salesData; // Array de vendas dos últimos 30 dias (data, vendas)

    return (
        <div className="dashboard-container">
            <Menu />
            <div className="dashboard-content">
                <h2>Dashboard</h2>
                <div className="dashboard-cards">
                    <Card
                        title="Total de Clientes"
                        value={dashboardData.totalClients}
                    />
                    <Card
                        title="Total de Pedidos"
                        value={dashboardData.totalOrders}
                    />
                    <Card
                        title="Total de Receita"
                        value={`R$ ${dashboardData.totalRevenue.toFixed(2)}`}
                    />
                    <Card
                        title="Produto Mais Vendido"
                        value={dashboardData.topSellingProduct.name}
                        description={`Vendidos: ${dashboardData.topSellingProduct.totalSales}`}
                    />
                    <Card
                        title="Cliente Mais Frequente"
                        value={dashboardData.topClient.name}
                        description={`Compras: ${dashboardData.topClient.totalPurchases}`}
                    />
                </div>

                {/* Gráfico de vendas */}
                <div className="dashboard-chart">
                    <SalesChart salesData={salesData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
