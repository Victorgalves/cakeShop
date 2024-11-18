import React, { useEffect, useState } from 'react';
import { getAllOrderEvaluations, deleteOrderEvaluation } from '../../services/OrderEvaluationService';
import Menu from '../../components/Menu/Menu';
import BackButton from '../../components/BackButton/BackButton';
import './OrderEvaluationList.css';

const OrderEvaluationList = () => {
    const [evaluations, setEvaluations] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [evaluationToDelete, setEvaluationToDelete] = useState(null);

    useEffect(() => {
        fetchEvaluations();
    }, []);

    const fetchEvaluations = async () => {
        const data = await getAllOrderEvaluations();
        setEvaluations(data);
    };

    const handleDeleteEvaluation = (id) => {
        setEvaluationToDelete(id);
        setShowModal(true);
    };

    const confirmDeleteEvaluation = async () => {
        if (evaluationToDelete) {
            await deleteOrderEvaluation(evaluationToDelete);
            fetchEvaluations();
        }
        setShowModal(false);
    };

    const cancelDeleteEvaluation = () => {
        setShowModal(false);
    };

    return (
        <div className="order-evaluation-list-container">
            <Menu />
            <div className="back-button-container">
                <BackButton to="/home" />
            </div>
            <h2>Avaliações de Pedidos</h2>

            <div className="order-evaluation-list">
                {evaluations.map((evaluation) => (
                    <div className="order-evaluation-card" key={evaluation.id}>
                        <div className="card-content">
                            <h4>Avaliação #{evaluation.id}</h4>
                            <p>Nota: {evaluation.productRating}</p>
                            <p>Comentário: {evaluation.productReview}</p>
                            <p>Categoria: {evaluation.evaluationType}</p>
                            <p>Data: {new Date(evaluation.date).toLocaleDateString('pt-BR')} {new Date(evaluation.date).toLocaleTimeString('pt-BR')}</p>
                        </div>
                        <div className="button-container">
                            <button onClick={() => handleDeleteEvaluation(evaluation.id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Tem certeza que deseja excluir esta avaliação?</h3>
                        <div className="modal-buttons">
                            <button onClick={confirmDeleteEvaluation}>Confirmar</button>
                            <button onClick={cancelDeleteEvaluation}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderEvaluationList;
