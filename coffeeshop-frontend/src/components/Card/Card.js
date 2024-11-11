import React from 'react';
import './Card.css'; // Adicione um CSS básico para estilizar o card

const Card = ({ title, value, description }) => {
    return (
        <div className="card">
            <h3>{title}</h3>
            <p>{value}</p>
            {description && <small>{description}</small>}
        </div>
    );
};

export default Card;
