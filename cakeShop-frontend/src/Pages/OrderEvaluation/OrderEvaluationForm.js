import React, { useState } from 'react';
import { addOrderEvaluation } from '../../services/OrderEvaluationService';
import './OrderEvaluationForm.css';

const OrderEvaluationForm = () => {
    const [productRating, setProductRating] = useState('');
    const [productReview, setProductReview] = useState('');
    const [evaluationType, setEvaluationType] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEvaluation = {
            productRating,
            productReview,
            evaluationType,
        };

        await addOrderEvaluation(newEvaluation);

        resetForm();
        setShowModal(true);

        // Ocultar modal após 5 segundos
        setTimeout(() => setShowModal(false), 5000);
    };

    const resetForm = () => {
        setProductRating('');
        setProductReview('');
        setEvaluationType('');
    };

    const getColorClass = (rating) => {
        if (rating <= 1) return 'rating-red';
        if (rating <= 4) return 'rating-orange';
        if (rating <= 7) return 'rating-yellow';
        return 'rating-green';
    };

    return (
        <div className="order-evaluation-form-container">

            <h2>Avalie sua experiência</h2>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Obrigado por nos avaliar!</h3>
                        <p>Suas informações foram enviadas com sucesso.</p>
                    </div>
                </div>
            )}

            <form className="order-evaluation-form" onSubmit={handleSubmit}>
                <div className="rating-section">
                    <label htmlFor="productRating" className="rating-label">
                        Qual a chance de recomendar nosso serviço?
                    </label>
                    <div className="rating-scale">
                        {Array.from({ length: 11 }, (_, i) => (
                            <button
                                key={i}
                                type="button"
                                className={`rating-button ${getColorClass(i)} ${productRating == i ? 'selected' : ''}`}
                                onClick={() => setProductRating(i)}
                            >
                                {i}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="evaluationType">Qual foi o destaque?</label>
                    <select
                        id="evaluationType"
                        value={evaluationType}
                        onChange={(e) => setEvaluationType(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Selecione uma opção
                        </option>
                        <option value="Bom Atendimento">Bom Atendimento</option>
                        <option value="Ótima comida">Ótima comida</option>
                        <option value="Lugar excelente">Lugar excelente</option>
                        <option value="Nenhuma das opções">Nenhuma das opções</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="productReview">Deixe um comentário:</label>
                    <textarea
                        id="productReview"
                        placeholder="Nos conte o que achou!"
                        value={productReview}
                        onChange={(e) => setProductReview(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">
                    Enviar avaliação
                </button>
            </form>
        </div>
    );
};

export default OrderEvaluationForm;
