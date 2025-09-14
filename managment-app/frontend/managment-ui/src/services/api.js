import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    register: (email, password) => api.post('/auth/register', { email, password }),
    login: (email, password) => api.post('/auth/login', { email, password }),
};

export const debtService = {
    getAll: () => api.get('/debts'),
    getById: (id) => api.get(`/debts/${id}`),
    create: (amount, description) => api.post('/debts', { amount, description }),
    update: (id, amount, description) => api.put(`/debts/${id}`, { amount, description }),
    delete: (id) => api.delete(`/debts/${id}`),
    markAsPaid: (id) => api.patch(`/debts/${id}/paid`),
    exportDebts: (format = 'json') => api.get(`/debts/export?format=${format}`, { responseType: 'blob' }),
    getSummary: () => api.get('/debts/summary'),
};

export default api;