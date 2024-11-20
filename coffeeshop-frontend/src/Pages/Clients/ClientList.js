import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllClients, deleteClient } from '../../services/ClientService';
import Menu from "../../components/Menu/Menu";
import './ClientList.css';

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [filter, setFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [clientToDelete, setClientToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClients = async () => {
            const clientsData = await getAllClients();
            setClients(clientsData);
        };

        fetchClients();
    }, []);

    // Filtra os clientes com base no nome
    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(filter.toLowerCase())
    );

    const handleDelete = (cpf) => {
        setClientToDelete(cpf);
        setShowModal(true);
    };

    const confirmDelete = async () => {
        if (clientToDelete) {
            try {
                await deleteClient(clientToDelete);
                setClients(clients.filter(client => client.cpf !== clientToDelete));
            } catch (error) {
            }
        }
        setShowModal(false);
        setClientToDelete(null);
    };

    const cancelDelete = () => {
        setShowModal(false);
        setClientToDelete(null);
    };

    const handleGoHome = () => {
        navigate('/home');
    };

    return (
        <div className="client-list-page">
            <Menu />
            <div className="client-list-container">
                <div className="header">
                    <div className="header-buttons">
                        <button className="btn-back" onClick={handleGoHome}>Voltar</button>
                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Filtrar por nome"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                        </div>
                        <Link to="/clients/novo">
                            <button className="btn-primary">Adicionar Cliente</button>
                        </Link>
                    </div>
                </div>

                <div className="client-cards">
                    {filteredClients.map(client => (
                        <div className="client-card" key={client.cpf}>
                            <h3>{client.name}</h3>
                            <p><strong>CPF:</strong> {client.cpf}</p>
                            <p><strong>Email:</strong> {client.email}</p>
                            <p className="client-details"><strong>Telefone:</strong> {client.phone}</p>
                            <div className="actions">
                                <Link to={`/clients/editar/${client.cpf}`}>
                                    <button className="btn-edit">Editar</button>
                                </Link>
                                <button className="btn-delete" onClick={() => handleDelete(client.cpf)}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Tem certeza que deseja excluir este cliente?</h3>
                            <div className="modal-buttons">
                                <button onClick={confirmDelete}>Confirmar</button>
                                <button onClick={cancelDelete}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ClientList;
