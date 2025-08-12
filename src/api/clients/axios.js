import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://panel.seatourism.sa/api',
  headers: {
    
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});


export default apiClient;