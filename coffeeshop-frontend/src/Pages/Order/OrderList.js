import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, deleteOrder } from '../../services/OrderService';
import Menu from '../../components/Menu/Menu';
import BackButton from '../../components/BackButton/BackButton';
import './OrderList.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [filterId, setFilterId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getAllOrders();
            const sortedOrders = data.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
            setOrders(sortedOrders);
            setFilteredOrders(sortedOrders);
        } catch (error) {
            console.error('Erro ao carregar os pedidos:', error);
        }
    };

    const handleDeleteOrder = async () => {
        try {
            if (orderToDelete) {
                await deleteOrder(orderToDelete.idOrder);
                setOrders((prevOrders) => prevOrders.filter((order) => order.idOrder !== orderToDelete.idOrder));
                setFilteredOrders((prevOrders) => prevOrders.filter((order) => order.idOrder !== orderToDelete.idOrder));
                setFeedbackMessage(`Pedido #${orderToDelete.idOrder} excluído com sucesso!`);
            }
        } catch (error) {
            console.error('Erro ao deletar pedido:', error);
            alert('Erro ao deletar o pedido. Por favor, tente novamente.');
        } finally {
            setShowDeleteModal(false);
            setOrderToDelete(null);
        }
    };

    const openDeleteModal = (order) => {
        setOrderToDelete(order);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setOrderToDelete(null);
    };

    const handleAddOrder = () => {
        navigate('/order/new');
    };

    const handleFilterChange = (e) => {
        const value = e.target.value;
        setFilterId(value);

        if (value.trim() === '') {
            setFilteredOrders(orders); // Mostra todos os pedidos se o filtro estiver vazio
        } else {
            const filtered = orders.filter((order) =>
                order.idOrder.toString().includes(value)
            );
            setFilteredOrders(filtered);
        }
    };

    useEffect(() => {
        if (feedbackMessage) {
            const timer = setTimeout(() => setFeedbackMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [feedbackMessage]);

    return (
        <div className="order-list-container">
            <Menu />
            <div className="back-button-container">
                <BackButton to="/home" />
            </div>
            <h2>Pedidos</h2>

            {feedbackMessage && (
                <div className="feedback-message">
                    {feedbackMessage}
                </div>
            )}

            <div className="action-buttons">
                <button className="add-order-button" onClick={handleAddOrder}>
                    Adicionar Novo Pedido
                </button>
            </div>

            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Filtrar por ID do Pedido"
                    value={filterId}
                    onChange={handleFilterChange}
                    className="filter-input"
                />
            </div>

            <div className="order-list">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <div className="order-card" key={order.idOrder}>
                            <h4>Pedido #{order.idOrder}</h4>
                            <p><strong>Funcionário CPF:</strong> {order.employeeCpf}</p>
                            <p><strong>Cliente CPF:</strong> {order.clientCpf}</p>
                            <p><strong>Data e Hora:</strong> {new Date(order.orderTime).toLocaleString()}</p>

                            <div className="button-container">
                                <button
                                    onClick={() => navigate(`/order/view/${order.idOrder}`)}
                                    className="view-button"
                                >
                                    Ver Detalhes
                                </button>
                                <button
                                    onClick={() => openDeleteModal(order)}
                                    className="delete-button"
                                >
                                    Deletar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum pedido encontrado.</p>
                )}
            </div>

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirmação de Exclusão</h3>
                        <p>Tem certeza que deseja excluir o pedido #{orderToDelete.idOrder}?</p>
                        <div className="modal-buttons">
                            <button onClick={handleDeleteOrder}>Sim</button>
                            <button onClick={closeDeleteModal}>Não</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderList;
