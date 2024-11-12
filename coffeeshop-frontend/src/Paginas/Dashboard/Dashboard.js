import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../../services/DashboardService';
import Card from '../../components/Card/Card';
import Menu from '../../components/Menu/Menu';
import SalesChart from '../../components/SalesChart/SalesChart';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';

// Registro do Chart.js para usar os componentes necessários
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

    const salesData = dashboardData.salesData;
    const productsSoldLast30Days = dashboardData.productsSoldLast30Days;

    // Dados para o gráfico de barras (Produtos Vendidos)
    const productNames = productsSoldLast30Days.map(product => product.name);
    const productSales = productsSoldLast30Days.map(product => product.totalSales);

    const productChartData = {
        labels: productNames,
        datasets: [
            {
                label: 'Produtos Vendidos',
                data: productSales,
                backgroundColor: '#4e73df',
                borderColor: '#2e59d9',
                borderWidth: 1,
            },
        ],
    };

    const productChartOptions = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Produtos Vendidos nos Últimos 30 Dias',
            },
        },
    };

    return (
        <div className="dashboard-container">
            <Menu />
            <div className="dashboard-content">
                <h2>Dashboard</h2>
                <div className="dashboard-cards">
                    <Card title="Total de Clientes" value={dashboardData.totalClients} />
                    <Card title="Total de Pedidos" value={dashboardData.totalOrders} />
                    <Card title="Total de Receita" value={`R$ ${dashboardData.totalRevenue.toFixed(2)}`} />
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
                    {/* Novo card para o NPS */}
                    <Card
                        title="Média de Avaliações (NPS)"
                        value={dashboardData.averageRating ? dashboardData.averageRating.toFixed(1) : 'N/A'}
                    />
                </div>

                <div className="dashboard-charts">
                    <div className="chart-container">
                        <SalesChart salesData={salesData} />
                    </div>
                    <div className="chart-container">
                        <Bar data={productChartData} options={productChartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
