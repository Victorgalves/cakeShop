import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, getOrderItemsByOrderId, getProductById } from '../../services/OrderService';
import Menu from '../../components/Menu/Menu';
import BackButton from '../../components/BackButton/BackButton';
import './ProductionList.css';

const ProductionList = () => {
    const [orders, setOrders] = useState([]);
    const [itemsByOrder, setItemsByOrder] = useState({});
    const [productDetails, setProductDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getAllOrders();
            setOrders(data);
            data.forEach(order => {
                fetchOrderItems(order.idOrder);
            });
        } catch (error) {
            console.error('Erro ao carregar os pedidos:', error);
        }
    };

    const fetchOrderItems = async (orderId) => {
        if (!itemsByOrder[orderId]) {
            try {
                const items = await getOrderItemsByOrderId(orderId);
                setItemsByOrder((prevItems) => ({
                    ...prevItems,
                    [orderId]: items,
                }));

                for (let item of items) {
                    const productData = await getProductById(item.idProduct);
                    setProductDetails((prevDetails) => ({
                        ...prevDetails,
                        [item.idProduct]: productData,
                    }));
                }
            } catch (error) {
                console.error('Erro ao carregar os itens do pedido:', error);
            }
        }
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

            <div className="order-list">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div className="order-card" key={order.idOrder}>
                            <h4>Pedido #{order.idOrder}</h4>

                            <div className="order-items">
                                {itemsByOrder[order.idOrder] ? (
                                    <table className="order-items-table">
                                        <thead>
                                        <tr>
                                            <th>Produto ID</th>
                                            <th>Nome do Produto</th>
                                            <th>Quantidade</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {itemsByOrder[order.idOrder].map((item) => (
                                            <tr key={item.idOrderItems}>
                                                <td>{item.idProduct}</td>
                                                <td>{productDetails[item.idProduct] ? productDetails[item.idProduct].name : 'Carregando...'}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>Carregando itens...</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum pedido encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default ProductionList;
