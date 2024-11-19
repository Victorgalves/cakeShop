import axios from 'axios';

const API_URL = 'http://localhost:8080/orders';

export const getAllOrders = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getOrderById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const createOrder = async (order) => {
    const response = await axios.post(API_URL, order);
    return response.data;
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
    return response.data;
};

