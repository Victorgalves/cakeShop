import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
    const [cpf, setCpf] = useState('');
    const [erro, setErro] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!cpf) {
            setErro('Por favor, insira seu CPF!');
            return;
        }

        setCarregando(true); //pra aparecer carregando...

        fetch(`http://localhost:8080/employees/${cpf}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('CPF não encontrado no sistema.');
                }
                return response.json();  // retorna os dados do funcionário
            })
            .then((data) => {
                setCarregando(false);  // termina de carregar
                if (data && data.cpf) {
                    localStorage.setItem('cpf', cpf); // Armazena o CPF no localStorage
                    alert(`Bem-vindo, ${data.name}!`);
                    navigate('/home');
                }
            })
            .catch((error) => {
                setCarregando(false);
                setErro(error.message);
            });
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
        </div>
    );
}

export default Login;
