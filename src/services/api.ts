import axios from 'axios';

const API_URL = 'http://localhost:3001';

// 📋 Запрос на получение всех читателей
export const fetchAllReaders = async () => {
  const response = await axios.get(`${API_URL}/readers`);
  return response.data;
};