import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quiz-india-backend.onrender.com/api/',
});

export default api;
