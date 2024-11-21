import axios from 'axios';

const API_URL = 'http://localhost:8080/clients';

export const getAllClients = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getClientByCpf = async (cpf) => {
    const response = await axios.get(`${API_URL}/${cpf}`);
    return response.data;
};

export const addClient = async (client) => {
    const response = await axios.post(API_URL, client);
    return response.data;
};

export const updateClient = async (cpf, client) => {
    const response = await axios.put(`${API_URL}/${cpf}`, client);
    return response.data;
};

export const deleteClient = async (cpf) => {
    const response = await axios.delete(`${API_URL}/${cpf}`);
    return response.data;
};
