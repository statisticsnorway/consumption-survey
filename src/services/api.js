import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export default api;
