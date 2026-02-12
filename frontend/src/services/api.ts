import axios from 'axios';

// Use environment variable for API URL or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getVulnerabilities = async (params: any = {}) => {
    try {
        const response = await api.get('/vulnerabilities', { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getVulnerability = async (id: string) => {
    try {
        const response = await api.get(`/vulnerabilities/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createVulnerability = async (data: any) => {
    try {
        const response = await api.post('/vulnerabilities', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateVulnerability = async (id: string, data: any) => {
    try {
        const response = await api.put(`/vulnerabilities/${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteVulnerability = async (id: string) => {
    try {
        const response = await api.delete(`/vulnerabilities/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default api;
