import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClientByCpf, addClient, updateClient } from '../../services/ClientService';
import Menu from '../../components/Menu/Menu';  // Importando o Menu
import './ClientForm.css';

const ClientForm = () => {
    const navigate = useNavigate();
    const { cpf } = useParams();  // Captura o CPF do cliente (para edição)
    const [client, setClient] = useState({
        cpf: '',
        name: '',
        email: '',
        phone: '',
        street: '',
        district: '',
        number: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        if (cpf) {
            // Caso esteja editando, buscar o cliente pelo CPF
            const fetchClient = async () => {
                const clientData = await getClientByCpf(cpf);
                setClient(clientData);
            };
            fetchClient();
        }
    }, [cpf]);

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
                // Se existir um CPF (está editando)
                await updateClient(cpf, client);  // Passando o cpf junto com o objeto client
                setModalMessage('Cliente atualizado com sucesso!');
            } else {
                // Se não existir CPF (está criando)
                await addClient(client);
                setModalMessage('Cliente criado com sucesso!');
            }
            setShowModal(true); // Exibe o modal após sucesso
        } catch (error) {
            console.error(error);
            setModalMessage('Erro ao salvar cliente. Tente novamente.');
            setShowModal(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/clients'); // Redireciona para a lista de clientes após fechar o modal
    };

    const handleGoBack = () => {
        navigate('/clients');  // Redireciona para a lista de clientes ao clicar em voltar
    };

    return (
        <div className="client-form-page">
            <Menu /> {/* Adicionando o Menu aqui */}
            <div className="client-form-container">
                <button className="btn-back" onClick={handleGoBack}>Voltar</button> {/* Botão de Voltar */}
                <h2>{cpf ? 'Editar Cliente' : 'Adicionar Cliente'}</h2>
                <form onSubmit={handleSubmit} className="client-form">
                    {/* Campo CPF - Aparece apenas ao adicionar um novo cliente */}
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
                        <label>Telefone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={client.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
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

                {/* Modal de Sucesso */}
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
