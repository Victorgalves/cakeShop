// src/components/SalesChart/SalesChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registra os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesChart = ({ salesData }) => {
    // Estrutura de dados do gráfico
    const chartData = {
        labels: salesData.map(item => item.date), // Data dos últimos 30 dias
        datasets: [
            {
                label: 'Vendas (Últimos 30 dias)',
                data: salesData.map(item => item.sales), // Vendas de cada dia
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: true,
            },
        ],
    };

    // Opções do gráfico
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Gráfico de Vendas - Últimos 30 dias',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Data',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Vendas (R$)',
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default SalesChart;
