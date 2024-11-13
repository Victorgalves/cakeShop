// src/Pages/Product/ProductList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../../services/ProductService';
import Menu from '../../components/Menu/Menu';
import BackButton from '../../components/BackButton/BackButton';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const data = await getAllProducts();
        setProducts(data);
    };

    const handleDeleteProduct = async (id) => {
        setProductToDelete(id);
        setShowModal(true);
    };

    const confirmDeleteProduct = async () => {
        if (productToDelete) {
            await deleteProduct(productToDelete);
            fetchProducts();
        }
        setShowModal(false);
    };

    const cancelDeleteProduct = () => {
        setShowModal(false);
    };

    const handleAddProduct = () => {
        navigate('/products/new');
    };

    const handleEditProduct = (product) => {
        navigate('/products/edit', { state: { product } });
    };

    const goToInventory = () => {
        navigate('/inventory');
    };

    return (
        <div className="product-list-container">
            <Menu />
            <div className="back-button-container">
                <BackButton to="/home" />
            </div>
            <h2>Produtos</h2>

            {/* Botões de ações */}
            <div className="action-buttons">
                <button className="add-product-button" onClick={handleAddProduct}>
                    Adicionar Novo Produto
                </button>
                <button className="inventory-button" onClick={goToInventory}>
                    Visualizar Estoque
                </button>
            </div>

            <div className="product-list">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <h4>{product.name}</h4>
                        <p>Descrição: {product.description}</p>
                        <p>Preço: R$ {product.price.toFixed(2)}</p>
                        <div className="button-container">
                            <button onClick={() => handleEditProduct(product)}>Editar</button>
                            <button onClick={() => handleDeleteProduct(product.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal de Confirmação de Exclusão */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Tem certeza que deseja excluir este produto?</h3>
                        <div className="modal-buttons">
                            <button onClick={confirmDeleteProduct}>Confirmar</button>
                            <button onClick={cancelDeleteProduct}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;
