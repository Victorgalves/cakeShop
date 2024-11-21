// Card.js
import React from 'react';
import './Card.css';

const Card = ({ title, value, description }) => {
    return (
        <div className="dashboard-card">
            <h3 className="card-title">{title}</h3>
            <p className="card-value">{value}</p>
            {description && <small className="card-description">{description}</small>}
        </div>
    );
};

export default Card;
