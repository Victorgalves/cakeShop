import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, getOrderItemsByOrderId } from '../../services/OrderService';
import Menu from '../../components/Menu/Menu';
import BackButton from '../../components/BackButton/BackButton';
import './OrderList.css';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [itemsByOrder, setItemsByOrder] = useState({});
    const [expandedOrder, setExpandedOrder] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getAllOrders();
                const sortedOrders = data.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
            setOrders(sortedOrders);
        } catch (error) {
            console.error('Erro ao carregar os pedidos:', error);
        }
    };

    const handleViewOrderDetails = (orderId) => {
        navigate(`/order/view/${orderId}`);
    };


    const handleAddOrder = () => {
        console.log('Botão de adicionar clicado');
        navigate('/order/new');
    };

    return (
        <div className="order-list-container">
            <Menu />
            <div className="back-button-container">
                <BackButton to="/home" />
            </div>
            <h2>Pedidos</h2>

            <div className="action-buttons">
                <button className="add-order-button" onClick={handleAddOrder}>
                    Adicionar Novo Pedido
                </button>
            </div>

            <div className="order-list">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div className="order-card" key={order.idOrder}>
                            <h4>Pedido #{order.idOrder}</h4>
                            <p><strong>Funcionário CPF:</strong> {order.employeeCpf}</p>
                            <p><strong>Cliente CPF:</strong> {order.clientCpf}</p>
                            <p><strong>Data e Hora:</strong> {new Date(order.orderTime).toLocaleString()}</p>

                            {/* Botão para alternar a exibição dos itens */}
                            <button onClick={() => handleViewOrderDetails(order.idOrder)}>
                                {expandedOrder === order.idOrder ? 'Esconder Itens' : 'Ver Detalhes'}
                            </button>

                            {expandedOrder === order.idOrder && (
                                <div className="order-items">
                                    {itemsByOrder[order.idOrder] ? (
                                        itemsByOrder[order.idOrder].map((item) => (
                                            <div key={item.idOrderItems} className="order-item">
                                                <p><strong>Produto ID:</strong> {item.idProduct}</p>
                                                <p><strong>Quantidade:</strong> {item.quantity}</p>
                                                <p><strong>Preço Unitário:</strong> R$ {item.price.toFixed(2)}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Carregando itens...</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Nenhum pedido encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default OrderList;
