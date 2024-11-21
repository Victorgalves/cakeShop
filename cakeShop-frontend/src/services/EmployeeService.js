import axios from 'axios';

const API_URL = 'http://localhost:8080/employees';

export const getAllEmployee = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getEmployeeByCpf = async (cpf) => {
    const response = await axios.get(`${API_URL}/${cpf}`);
    return response.data;
};

export const addEmployee = async (employee) => {
    const response = await axios.post(API_URL, employee);
    return response.data;
};

export const updateEmployee = async (cpf, employee) => {
    const response = await axios.put(`${API_URL}/${cpf}`, employee);
    return response.data;
};

export const deleteEmployee = async (cpf) => {
    const response = await axios.delete(`${API_URL}/${cpf}`);
    return response.data;
};
