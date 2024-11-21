import axios from 'axios';

const API_URL = 'http://localhost:8080/orders';

export const getAllOrders = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
};

export const getOrderById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createOrder = async (orderData) => {
    try {
        const response = await fetch('http://localhost:8080/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            throw new Error('Erro ao criar pedido');
        }

        const data = await response.json();

        if (data && data.idOrder) {
            return data;
        } else {
            throw new Error('ID do pedido não encontrado');
        }
    } catch (error) {
        console.error('Erro ao criar pedido:', error);
        throw error;
    }
};

export const deleteOrder = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};

export const getOrderItemsByOrderId = async (id) => {
    const response = await axios.get(`http://localhost:8080/orderItems/${id}`);
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(`http://localhost:8080/product/${id}`);
    return response.data;
};

export const addOrderItem = async (orderItem) => {
    const response = await axios.post(`http://localhost:8080/orderItems`, orderItem);
    return response.data;  // Verifique se os dados retornados estão corretos
};

export const updateOrderItem = async (orderId, itemId, updatedItem) => {
    try {
        const response = await axios.put(`http://localhost:8080/orderItems/${orderId}/${itemId}`, updatedItem);
        return response.data;  // Verifique a resposta para garantir que os dados estão sendo retornados corretamente
    } catch (error) {
        console.error('Erro ao atualizar item:', error);
        throw error;
    }
};


export const deleteOrderItem = async (idOrderItem) => {
    const response = await axios.delete(`http://localhost:8080/orderItems/${idOrderItem}`);
    return response.data;
};
