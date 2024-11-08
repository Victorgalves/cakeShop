import React from 'react';
import './DashboardCard.css'; // Adicione um CSS básico para estilizar o card

const DashboardCard = ({ title, value, description }) => {
    return (
        <div className="dashboard-card">
            <h3>{title}</h3>
            <p>{value}</p>
            {description && <small>{description}</small>}
        </div>
    );
};

export default DashboardCard;
