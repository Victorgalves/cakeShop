import axios from 'axios';

const API_URL = 'http://localhost:8080/orderEvaluation';

export const getAllOrderEvaluations = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};


export const addOrderEvaluation = async (orderEvaluation) => {
    const response = await axios.post(API_URL, orderEvaluation);
    return response.data;
};


export const deleteOrderEvaluation = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};
