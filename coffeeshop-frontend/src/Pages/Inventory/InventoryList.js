import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllInventories, deleteInventory, updateInventory } from '../../services/InventoryService';
import Menu from '../../components/Menu/Menu';
import BackButton from '../../components/BackButton/BackButton';
import './InventoryList.css'; // Certifique-se de que o caminho esteja correto

const InventoryList = () => {
    const [inventories, setInventories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null); // Guarda o produto que será excluído
    const navigate = useNavigate();

    useEffect(() => {
        fetchInventories();
    }, []);

    const fetchInventories = async () => {
        const data = await getAllInventories();
        setInventories(data);
    };

    const handleDeleteInventory = async () => {
        if (productToDelete) {
            await deleteInventory(productToDelete.productId);
            fetchInventories();
            setIsModalOpen(false); // Fecha o modal após excluir
            setProductToDelete(null); // Limpa o produto selecionado
        }
    };

    const handleUpdateQuantity = async (id, action) => {
        const quantity = 1;
        await updateInventory(id, action, quantity);

        setInventories((prevInventories) =>
            prevInventories.map((inventory) =>
                inventory.productId === id
                    ? {
                        ...inventory,
                        quantity: action === 'increase' ? inventory.quantity + quantity :
                            action === 'decrease' ? inventory.quantity - quantity : 0,
                    }
                    : inventory
            )
        );
    };

    const openModal = (product) => {
        setProductToDelete(product); // Guarda o produto selecionado para exclusão
        setIsModalOpen(true); // Abre o modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Fecha o modal
        setProductToDelete(null); // Limpa o produto selecionado
    };

    return (
        <div className="inventory-list-container">
            <Menu />
            <div className="back-button-container">
                <BackButton to="/product" />
            </div>
            <h2>Estoque</h2>
            <div className="inventory-list">
                {inventories.map((inventory) => (
                    <div className="inventory-card" key={inventory.productId}>
                        <p className="product-name">{inventory.productName}</p>
                        <p>ID: {inventory.productId}</p>
                        <p>Quantidade: {inventory.quantity}</p>
                        <p>Data: {inventory.date}</p>

                        {/* Botões de Ação */}
                        <div className="action-buttons">
                            <button className="action-button increase" onClick={() => handleUpdateQuantity(inventory.productId, 'increase')}>
                                +
                            </button>
                            <button className="action-button decrease" onClick={() => handleUpdateQuantity(inventory.productId, 'decrease')}>
                                -
                            </button>
                            <button className="action-button remove" onClick={() => handleUpdateQuantity(inventory.productId, 'remove')}>
                                0
                            </button>
                        </div>
                        <button className="delete-button" onClick={() => openModal(inventory)}>
                            Excluir Produto
                        </button>
                    </div>
                ))}
            </div>

            {/* Modal de Confirmação de Exclusão */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Tem certeza que deseja excluir este produto?</h3>
                        <p>{productToDelete && productToDelete.productName}</p>
                        <div className="modal-actions">
                            <button className="modal-button cancel" onClick={closeModal}>Cancelar</button>
                            <button className="modal-button confirm" onClick={handleDeleteInventory}>Excluir</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryList;
