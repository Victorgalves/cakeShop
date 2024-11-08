import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; // Importe o BrowserRouter

ReactDOM.render(
    <BrowserRouter>  {/* Envolva a aplicação com o BrowserRouter */}
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
