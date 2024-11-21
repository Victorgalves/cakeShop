import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { createOrder, addOrderItem } from "../../services/OrderService";
import { getAllProducts } from "../../services/ProductService";
import Menu from "../../components/Menu/Menu";
import BackButton from "../../components/BackButton/BackButton";
import "./OrderForm.css";

const OrderForm = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [clientCpf, setClientCpf] = useState("");
    const [orderId, setOrderId] = useState(null);
    const [step, setStep] = useState(1);
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const loggedInCpf = localStorage.getItem("cpf");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleCreateOrder = async () => {
        if (!isAnonymous && (!clientCpf || clientCpf.length !== 11)) {
            setErrorMessage("CPF inválido!");
            setShowErrorModal(true);
            return;
        }

        const orderData = { clientCpf: isAnonymous ? null : clientCpf, employeeCpf: loggedInCpf };

        try {
            const response = await createOrder(orderData);

            if (response && response.idOrder) {
                setOrderId(response.idOrder);
                setStep(2);
            } else {
                setErrorMessage("Erro ao criar pedido: ID do pedido não encontrado");
                setShowErrorModal(true);
            }
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            setErrorMessage("Erro ao criar pedido. Tente novamente.");
            setShowErrorModal(true);
        }
    };

    const handleAddItemToOrder = () => {
        const product = products.find((p) => p.id === parseInt(selectedProductId));
        if (product) {
            const existingItemIndex = orderItems.findIndex((item) => item.idProduct === product.id);

            if (existingItemIndex !== -1) {
                const updatedItems = [...orderItems];
                updatedItems[existingItemIndex].quantity += 1;
                setOrderItems(updatedItems);
            } else {
                const newItem = {
                    idProduct: product.id,
                    name: product.name,
                    quantity: 1,
                    price: product.price,
                };
                setOrderItems((prevItems) => [...prevItems, newItem]);
            }

            setSelectedProductId("");
        } else {
            setErrorMessage("Produto não encontrado.");
            setShowErrorModal(true);
        }
    };

    const handleUpdateQuantity = (index, newQuantity) => {
        if (newQuantity < 1) return;
        const updatedItems = [...orderItems];
        updatedItems[index].quantity = newQuantity;
        setOrderItems(updatedItems);
    };

    const handleDeleteItem = (index) => {
        const updatedItems = orderItems.filter((_, i) => i !== index);
        setOrderItems(updatedItems);
    };

    const calculateTotal = () => {
        return orderItems.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);
    };

    const handleFinalizeOrder = async () => {
        if (orderItems.length === 0) {
            setErrorMessage("Por favor, adicione ao menos um produto ao pedido.");
            setShowErrorModal(true);
            return;
        }

        try {
            for (const item of orderItems) {
                await addOrderItem({
                    ...item,
                    orderId,
                });
            }

            setShowModal(true);
        } catch (error) {
            console.error("Erro ao finalizar pedido:", error);
            setErrorMessage("Erro ao finalizar pedido. Tente novamente.");
            setShowErrorModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigate("/orders");
    };

    const closeErrorModal = () => {
        setShowErrorModal(false);
    };

    return (
        <div className="order-form-container">
            <Menu />
            <BackButton className="order-form-back-button" to="/orders" />
            <h2>{step === 1 ? "Criar novo pedido" : "Adicionar itens ao pedido"}</h2>

            {step === 1 && (
                <>
                    <div className="order-form-group">
                        <label htmlFor="clientCpf">CPF do Cliente</label>
                        <input
                            type="text"
                            id="clientCpf"
                            value={isAnonymous ? "" : clientCpf}
                            onChange={(e) => setClientCpf(e.target.value)}
                            placeholder="Digite o CPF do cliente"
                            disabled={isAnonymous}
                        />
                    </div>
                    <div className="order-form-group order-form-inline">
                        <input
                            type="checkbox"
                            id="anonymous"
                            checked={isAnonymous}
                            onChange={() => setIsAnonymous(!isAnonymous)}
                        />
                        <label htmlFor="anonymous">Cliente sem cadastro</label>
                    </div>

                    <button className="order-form-button" onClick={handleCreateOrder}>
                        Criar Pedido
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <div className="order-form-group">
                        <label htmlFor="productSelect">Selecione um Produto</label>
                        <select
                            id="productSelect"
                            value={selectedProductId}
                            onChange={(e) => setSelectedProductId(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="order-form-button" onClick={handleAddItemToOrder}>
                        Adicionar Item
                    </button>

                    <div className="order-form-items">
                        <h3>Itens do Pedido</h3>
                        <ul>
                            {orderItems.map((item, index) => (
                                <li key={index}>
                                    <div>
                                        <span className="item-name">{item.name}</span> - R$ {item.price.toFixed(2)} x {item.quantity}
                                    </div>
                                    <div className="order-item-actions">
                                        <button onClick={() => handleUpdateQuantity(index, item.quantity + 1)}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                        <button onClick={() => handleUpdateQuantity(index, item.quantity - 1)}>
                                            <FontAwesomeIcon icon={faMinus} />
                                        </button>
                                        <button onClick={() => handleDeleteItem(index)}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="order-form-total">Total: R$ {calculateTotal()}</div>
                    <button className="order-form-button finalize-order-button" onClick={handleFinalizeOrder}>
                        Finalizar Pedido
                    </button>
                </>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Pedido finalizado com sucesso!</h3>
                        <p>Número do pedido: #<strong>{orderId}</strong></p>
                        <button className="modal-button" onClick={closeModal}>
                            OK
                        </button>
                    </div>
                </div>
            )}

            {showErrorModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Erro</h3>
                        <p>{errorMessage}</p>
                        <button className="modal-button" onClick={closeErrorModal}>
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderForm;
