import axios from 'axios';

// URL base do seu backend
const API_URL = 'http://localhost:8080/inventory';

export const getAllInventories = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Retorna os inventários
    } catch (error) {
        console.error('Erro ao buscar inventários:', error);
    }
};

export const deleteInventory = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Erro ao excluir inventário:', error);
    }
};

export const updateInventory = async (id, action, quantity) => {
    try {
        const response = await axios.put(`${API_URL}/${id}/update-quantity`, null, {
            params: {
                action: action,
                quantity: quantity
            }
        });
    } catch (error) {
        console.error('Erro ao atualizar inventário:', error);
    }
};

