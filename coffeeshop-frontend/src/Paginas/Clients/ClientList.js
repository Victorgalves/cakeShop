import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllClients, deleteClient } from '../../services/ClientService';
import Modal from 'react-modal';
import './ClientList.css';

Modal.setAppElement('#root');

const ClientList = () => {
    const [clients, setClients] = useState([]);
    const [filter, setFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
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

    const handleDelete = async (cpf) => {
        try {
            await deleteClient(cpf);
            setClients(clients.filter(client => client.cpf !== cpf));  // Remove o cliente da lista após excluir
            setModalMessage('Cliente excluído com sucesso!');
            setIsModalOpen(true);
        } catch (error) {
            setModalMessage('Não é possível excluir o cliente com pedido associado.');
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="client-list-container">
            <div className="header">
                <h2>Lista de Clientes</h2>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Filtrar por nome"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}  // Atualiza o filtro
                    />
                </div>
                <Link to="/clients/novo">
                    <button className="btn-primary">Adicionar Cliente</button>
                </Link>
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

            {/* Modal de confirmação */}
            <Modal isOpen={isModalOpen} onRequestClose={closeModal} className="modal" overlayClassName="overlay">
                <div className="modal-content">
                    <p>{modalMessage}</p>
                    <button onClick={closeModal} className="btn-primary">Fechar</button>
                </div>
            </Modal>
        </div>
    );
};

export default ClientList;
