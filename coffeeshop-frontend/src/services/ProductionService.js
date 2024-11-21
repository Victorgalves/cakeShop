import axios from 'axios';

const API_URL = 'http://localhost:8080/orderProduction';

export const getAllOrderProductions = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar todas as produções de pedidos:', error);
        throw error;
    }
};

export const getOrderProductionsByOrderId = async (idOrder) => {
    try {
        const response = await axios.get(`${API_URL}/${idOrder}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar produções do pedido com ID ${idOrder}:`, error);
        throw error;
    }
};

export const createOrderProduction = async (orderProduction) => {
    try {
        const response = await axios.post(API_URL, orderProduction);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar produção de pedido:', error);
        throw error;
    }
};

export const updateOrderProductionStatusByOrderId = async (idOrder, status) => {
    try {
        const response = await axios.put(`${API_URL}/status/${idOrder}`, status, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Erro ao atualizar status da produção do pedido com ID ${idOrder}:`, error);
        throw error;
    }
};

export const deleteOrderProduction = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Erro ao excluir produção de pedido com ID ${id}:`, error);
        throw error;
    }
};
