import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [cpf, setCpf] = useState('');
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!cpf) {
            setErro('Por favor, insira seu CPF!');
            setModalMessage('Por favor, insira seu CPF!');
            setShowModal(true);
            return;
        }

        setCarregando(true);

        fetch(`http://localhost:8080/employees/${cpf}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('CPF não encontrado no sistema.');
                }
                return response.json();
            })
            .then((data) => {
                setCarregando(false);
                if (data && data.cpf) {
                    localStorage.setItem('cpf', cpf);
                    localStorage.setItem('nome', data.name); // Armazena o nome
                    setModalMessage(`Bem-vindo, ${data.name}!`);
                    setShowModal(true);
                    setTimeout(() => {
                        navigate('/home');
                    }, 2000);
                }
            })
            .catch((error) => {
                setCarregando(false);
                setErro(error.message);
                setModalMessage(error.message);
                setShowModal(true);
            });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cpf">CPF</label>
                    <input
                        type="text"
                        id="cpf"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                        placeholder="Digite seu CPF"
                        maxLength="11"
                        required
                    />
                </div>

                <div>
                    <button type="submit" disabled={carregando}>
                        {carregando ? 'Carregando...' : 'Entrar'}
                    </button>
                </div>
            </form>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <h3>{modalMessage}</h3>
                        <button onClick={handleCloseModal} className="btn-close">Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
