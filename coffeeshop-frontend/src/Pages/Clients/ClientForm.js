import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClientByCpf, addClient, updateClient } from '../../services/ClientService';
import Menu from '../../components/Menu/Menu'; // Menu importado
import './ClientForm.css';

const ClientForm = () => {
    const navigate = useNavigate();
    const { cpf } = useParams();
    const [client, setClient] = useState({
        cpf: '',
        name: '',
        email: '',
        phone: '',
        phone2: '', // Segundo telefone
        street: '',
        district: '',
        number: ''
    });
    const [showPhone2, setShowPhone2] = useState(false); // Controla visibilidade do Telefone 2
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        if (cpf) {
            const fetchClient = async () => {
                try {
                    const clientData = await getClientByCpf(cpf);
                    setClient(clientData);
                    if (clientData.phone2) setShowPhone2(true); // Mostra Telefone 2 se já estiver preenchido
                } catch (error) {
                    setModalMessage('Erro ao carregar cliente.');
                    setShowModal(true);
                    navigate('/clients');
                }
            };
            fetchClient();
        }
    }, [cpf, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setClient((prevClient) => ({
            ...prevClient,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            if (cpf) {
                await updateClient(cpf, client);
                setModalMessage('Cliente atualizado com sucesso!');
            } else {
                await addClient(client);
                setModalMessage('Cliente criado com sucesso!');
            }
            setShowModal(true);
        } catch (error) {
            setModalMessage('Erro ao salvar cliente. Tente novamente.');
            setShowModal(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/clients');
    };

    const handleGoBack = () => {
        navigate('/clients');
    };

    return (
        <div className="client-form-page">
            <Menu />
            <div className="client-form-container">
                <button className="btn-back" onClick={handleGoBack}>Voltar</button>
                <h2>{cpf ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
                <form onSubmit={handleSubmit} className="client-form">
                    {!cpf && (
                        <div className="form-group">
                            <label>CPF:</label>
                            <input
                                type="text"
                                name="cpf"
                                value={client.cpf}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Nome:</label>
                        <input
                            type="text"
                            name="name"
                            value={client.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={client.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Telefone 1:</label>
                        <div className="phone-group">
                            <input
                                type="text"
                                name="phone"
                                value={client.phone}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="btn-toggle-phone"
                                onClick={() => setShowPhone2((prev) => !prev)} // Alterna entre mostrar e ocultar
                            >
                                {showPhone2 ? '-' : '+'}
                            </button>
                        </div>
                    </div>

                    {showPhone2 && (
                        <div className="form-group">
                            <label>Telefone 2 (opcional):</label>
                            <input
                                type="text"
                                name="phone2"
                                value={client.phone2}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Rua:</label>
                        <input
                            type="text"
                            name="street"
                            value={client.street}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Bairro:</label>
                        <input
                            type="text"
                            name="district"
                            value={client.district}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Número:</label>
                        <input
                            type="text"
                            name="number"
                            value={client.number}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group" style={{ width: '100%' }}>
                        <button type="submit" className="btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'Salvando...' : (cpf ? 'Atualizar Cliente' : 'Adicionar Cliente')}
                        </button>
                    </div>
                </form>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-container">
                            <h3>{modalMessage}</h3>
                            <button onClick={handleCloseModal} className="btn-close">Fechar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientForm;
