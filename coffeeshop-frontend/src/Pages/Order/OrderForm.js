import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder, addOrderItem } from '../../services/OrderService';
import { getAllProducts } from "../../services/ProductService";
import Menu from '../../components/Menu/Menu';
import './OrderForm.css';

const OrderForm = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [clientCpf, setClientCpf] = useState('');
    const [orderId, setOrderId] = useState(null);
    const [step, setStep] = useState(1);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error('Erro ao carregar produtos:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleCreateOrder = async () => {
        if (!clientCpf || clientCpf.length !== 11) {
            alert('CPF inválido!');
            return;
        }

        const orderData = { clientCpf };

        try {
            const response = await createOrder(orderData);

            console.log('Resposta da criação do pedido:', response);

            if (response && response.idOrder) {
                setOrderId(response.idOrder);
                setStep(2);
            } else {
                alert('Erro ao criar pedido: ID do pedido não encontrado');
            }
        } catch (error) {
            console.error('Erro ao criar pedido:', error);
            alert('Erro ao criar pedido. Tente novamente.');
        }
    };

    const handleAddItemToOrder = async () => {
        if (!orderId) {
            alert('Por favor, crie o pedido antes de adicionar itens.');
            return;
        }

        const product = products.find(p => p.id === parseInt(selectedProductId));
        if (product) {
            const newItem = {
                idProduct: product.id,
                quantity: quantity,
                price: product.price,
                orderId: orderId,
            };

            try {
                const response = await addOrderItem(newItem);
                if (response) {
                    setOrderItems(prevItems => [...prevItems, newItem]);
                    setSelectedProductId('');
                    setQuantity(1);
                } else {
                    alert('Erro ao adicionar item ao pedido.');
                }
            } catch (error) {
                console.error('Erro ao adicionar item:', error);
                alert('Erro ao adicionar item ao pedido. Tente novamente.');
            }
        } else {
            alert('Produto não encontrado.');
        }
    };

    const handleFinalizeOrder = () => {
        if (orderItems.length === 0) {
            alert('Por favor, adicione ao menos um produto ao pedido.');
            return;
        }

        alert('Pedido finalizado com sucesso!');
        navigate('/orders');
    };

    return (
        <div className="order-form-container">
            <Menu />
            <h2>{step === 1 ? 'Criar Novo Pedido' : 'Adicionar Itens ao Pedido'}</h2>

            {step === 1 && (
                <>
                    <div className="form-group">
                        <label htmlFor="clientCpf">CPF do Cliente</label>
                        <input
                            type="text"
                            id="clientCpf"
                            value={clientCpf}
                            onChange={(e) => setClientCpf(e.target.value)}
                            placeholder="Digite o CPF do cliente"
                        />
                    </div>

                    <button className="next-step-button" onClick={handleCreateOrder}>
                        Criar Pedido
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <div className="form-group">
                        <label htmlFor="product">Produto</label>
                        <select
                            id="product"
                            value={selectedProductId}
                            onChange={(e) => setSelectedProductId(e.target.value)}
                        >
                            <option value="">Selecione um Produto</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name} - R$ {product.price.toFixed(2)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity">Quantidade</label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            min="1"
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                        />
                    </div>

                    <button className="add-item-button" onClick={handleAddItemToOrder}>
                        Adicionar Produto ao Pedido
                    </button>

                    <div className="order-items">
                        <h3>Itens no Pedido:</h3>
                        {orderItems.length > 0 ? (
                            <ul>
                                {orderItems.map((item, index) => (
                                    <li key={index}>
                                        {`Produto ID: ${item.idProduct} - Quantidade: ${item.quantity} - Preço: R$ ${item.price.toFixed(2)}`}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Nenhum item adicionado.</p>
                        )}
                    </div>

                    <button className="finalize-order-button" onClick={handleFinalizeOrder}>
                        Finalizar Pedido
                    </button>
                </>
            )}
        </div>
    );
};

export default OrderForm;
