import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, deleteProduct } from '../../services/ProductService';
import Menu from '../../components/Menu/Menu';
import BackButton from '../../components/BackButton/BackButton';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const data = await getAllProducts();
        setProducts(data);
    };

    const handleDeleteProduct = async (id) => {
        await deleteProduct(id);
        fetchProducts();
    };

    const handleAddProduct = () => {
        navigate('/products/new');
    };

    const handleEditProduct = (product) => {
        navigate('/products/edit', { state: { product } });
    };

    return (
        <div className="product-list-container">
            <Menu /> {/* Adiciona o Menu ao topo da página */}
            <div className="back-button-container">
                <BackButton to="/home" /> {/* Coloca o botão de voltar aqui */}
            </div>
            <h2>Produtos</h2>
            <button className="add-product-button" onClick={handleAddProduct}>
                Adicionar Novo Produto
            </button>
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
        </div>
    );
};

export default ProductList;
