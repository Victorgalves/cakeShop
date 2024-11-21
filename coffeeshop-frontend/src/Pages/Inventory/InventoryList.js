import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllInventories, deleteInventory, updateInventory } from '../../services/InventoryService';
import Menu from '../../components/Menu/Menu';
import BackButton from '../../components/BackButton/BackButton';
import './InventoryList.css';

const InventoryList = () => {
    const [inventories, setInventories] = useState([]);
    const [filteredInventories, setFilteredInventories] = useState([]);
    const [filter, setFilter] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchInventories();
    }, []);

    useEffect(() => {
        const filtered = inventories.filter((inventory) =>
            inventory.productName.toLowerCase().includes(filter.toLowerCase())
        );
        // Ordena alfabeticamente pelo nome do produto
        const sorted = filtered.sort((a, b) =>
            a.productName.toLowerCase().localeCompare(b.productName.toLowerCase())
        );
        setFilteredInventories(sorted);
    }, [filter, inventories]);

    const fetchInventories = async () => {
        const data = await getAllInventories();
        setInventories(data);
        setFilteredInventories(data);
    };

    const handleDeleteInventory = async () => {
        if (productToDelete) {
            await deleteInventory(productToDelete.productId);
            fetchInventories();
            setIsModalOpen(false);
            setProductToDelete(null);
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
        setProductToDelete(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setProductToDelete(null);
    };

    return (
        <div className="inventory-list-container">
            <Menu />
            <div className="back-button-container">
                <BackButton to="/product" />
            </div>
            <h2>Estoque</h2>

            <div className="filter-container">
                <input
                    type="text"
                    className="filter-input"
                    placeholder="Filtrar por nome do produto..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>

            <div className="inventory-list">
                {filteredInventories.map((inventory) => (
                    <div className="inventory-card" key={inventory.productId}>
                        <p className="product-name">{inventory.productName}</p>
                        <p>ID: {inventory.productId}</p>
                        <p>Quantidade: {inventory.quantity}</p>
                        <p>Data: {inventory.date}</p>

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
