// BackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

const BackButton = ({ to }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(to);
    };

    return (
        <button className="btn-back" onClick={handleGoBack}>
            Voltar
        </button>
    );
};

export default BackButton;
