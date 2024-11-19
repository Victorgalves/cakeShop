import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById, getOrderItemsByOrderId, getProductById } from '../../services/OrderService';
import Menu from '../../components/Menu/Menu';
import BackButton from '../../components/BackButton/BackButton';
import './OrderDetails.css';

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [productDetails, setProductDetails] = useState({});
    const navigate = useNavigate();

    // Cálculo do total
    const calculateTotal = () => {
        return orderItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const orderData = await getOrderById(orderId);
                setOrder(orderData);

                const itemsData = await getOrderItemsByOrderId(orderId);
                setOrderItems(itemsData);

                for (let item of itemsData) {
                    const productData = await getProductById(item.idProduct);
                    setProductDetails((prevDetails) => ({
                        ...prevDetails,
                        [item.idProduct]: productData,
                    }));
                }
            } catch (error) {
                console.error('Erro ao carregar os detalhes do pedido:', error);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    return (
        <div className="order-details-container">
            <Menu />

            <div className="back-button-container">
                <BackButton to="/orders" />
            </div>

            <h3>Itens do Pedido:</h3>
            <table className="order-items-table">
                <thead>
                <tr>
                    <th>Produto ID</th>
                    <th>Nome do Produto</th>
                    <th>Quantidade</th>
                    <th>Preço Unitário</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {orderItems.map((item) => (
                    <tr key={item.idOrderItems}>
                        <td>{item.idProduct}</td>
                        <td>{productDetails[item.idProduct] ? productDetails[item.idProduct].name : 'Carregando...'}</td>
                        <td>{item.quantity}</td>
                        <td>R$ {item.price.toFixed(2)}</td>
                        <td>R$ {(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Exibição do total */}
            <div className="total-container">
                <h4>Valor Total do Pedido: R$ {calculateTotal().toFixed(2)}</h4>
            </div>
        </div>
    );
};

export default OrderDetails;
