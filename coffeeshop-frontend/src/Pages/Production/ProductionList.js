import React, { useEffect, useState } from 'react';
import { getAllOrderProductions, updateOrderProductionStatusByOrderId } from '../../services/ProductionService';
import { getProductById } from '../../services/ProductService'; // Supondo que você tenha esse método para buscar o produto
import Menu from '../../components/Menu/Menu';
import BackButton from '../../components/BackButton/BackButton';
import './ProductionList.css';

const OrderProductionList = () => {
    const [orderProductions, setOrderProductions] = useState([]);
    const [itemsByOrder, setItemsByOrder] = useState({});
    const [statusByOrder, setStatusByOrder] = useState({});
    const [productsById, setProductsById] = useState({}); // Para armazenar os produtos carregados

    useEffect(() => {
        fetchOrderProductions();
    }, []);

    const fetchOrderProductions = async () => {
        try {
            const data = await getAllOrderProductions();
            setOrderProductions(data);

            const groupedItems = data.reduce((acc, item) => {
                if (!acc[item.idOrder]) {
                    acc[item.idOrder] = [];
                }
                acc[item.idOrder].push(item);
                return acc;
            }, {});
            setItemsByOrder(groupedItems);

            // Define o status inicial para cada pedido
            const initialStatus = data.reduce((acc, item) => {
                if (!acc[item.idOrder]) {
                    acc[item.idOrder] = item.status;
                }
                return acc;
            }, {});
            setStatusByOrder(initialStatus);

            // Carregar todos os produtos com base no idProduct
            const productIds = [...new Set(data.map(item => item.idProduct))];
            const products = await Promise.all(productIds.map(id => getProductById(id)));
            const productMap = products.reduce((acc, product) => {
                acc[product.id] = product.name; // Armazena o nome do produto pelo id
                return acc;
            }, {});
            setProductsById(productMap);
        } catch (error) {
            console.error('Erro ao carregar produções de pedidos:', error);
        }
    };

    const handleStatusChange = async (idOrder, newStatus) => {
        try {
            await updateOrderProductionStatusByOrderId(idOrder, newStatus);
            setStatusByOrder((prevStatus) => ({
                ...prevStatus,
                [idOrder]: newStatus,
            }));
        } catch (error) {
            console.error(`Erro ao atualizar o status do pedido ${idOrder}:`, error);
        }
    };

    return (
        <div className="order-list-container">
            <Menu />
            <div className="back-button-container">
                <BackButton to="/home" />
            </div>
            <h2>Produções de Pedidos</h2>

            <div className="order-list">
                {Object.keys(itemsByOrder).length > 0 ? (
                    Object.keys(itemsByOrder)
                        .sort((a, b) => b - a)
                        .map((idOrder) => (
                            <div className="order-card" key={idOrder}>
                                <h4>Pedido #{idOrder}</h4>

                                <div className="order-items">
                                    <table className="order-items-table">
                                        <thead>
                                        <tr>
                                            <th>ID Produto</th>
                                            <th>Produto</th>
                                            <th>Qtd</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {itemsByOrder[idOrder].map((item) => (
                                            <tr key={item.idOrderProduction}>
                                                <td>{item.idProduct}</td>
                                                <td>{productsById[item.idProduct] || 'Produto desconhecido'}</td>
                                                <td>{item.quantity}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="order-status">
                                    <label htmlFor={`status-${idOrder}`}>Status:</label>
                                    <select
                                        id={`status-${idOrder}`}
                                        value={statusByOrder[idOrder] || 'Pendente'}
                                        onChange={(e) => handleStatusChange(idOrder, e.target.value)}
                                    >
                                        <option value="Pendente">Pendente</option>
                                        <option value="Em andamento">Em andamento</option>
                                        <option value="Concluído">Concluído</option>
                                    </select>
                                </div>
                            </div>
                        ))
                ) : (
                    <p>Nenhuma produção encontrada.</p>
                )}
            </div>
        </div>
    );
};

export default OrderProductionList;
