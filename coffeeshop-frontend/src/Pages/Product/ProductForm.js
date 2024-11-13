import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { addProduct, updateProduct } from '../../services/ProductService';
import './ProductForm.css';
import BackButton from '../../components/BackButton/BackButton';
import Menu from '../../components/Menu/Menu';

const ProductForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isEditMode = location.state && location.state.product;

    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (isEditMode) {
            setProduct(location.state.product);
        }
    }, [isEditMode, location.state]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditMode) {
            await updateProduct(product.id, product);
        } else {
            await addProduct(product);
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/product');
    };

    return (
        <div>
            <Menu /> {/* Adiciona o Menu na parte superior */}
            <div className="product-form-container">
                <BackButton to="/product" /> {/* Adiciona o BackButton aqui */}
                <h2>{isEditMode ? 'Editar Produto' : 'Adicionar Produto'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Nome do Produto"
                        required
                    />
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Descrição do Produto"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Preço do Produto"
                        required
                    />
                    <select
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Selecione a Categoria</option>
                        <option value="Bebida quente">Bebida quente</option>
                        <option value="Bebida gelada">Bebida gelada</option>
                        <option value="Doce">Doce</option>
                        <option value="Salgado">Salgado</option>
                    </select>
                    <button type="submit">
                        {isEditMode ? 'Editar Produto' : 'Adicionar Produto'}
                    </button>
                </form>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <h3>{isEditMode ? 'Produto Atualizado!' : 'Produto Adicionado!'}</h3>
                            <button onClick={handleCloseModal}>OK</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductForm;
