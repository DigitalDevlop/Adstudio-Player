import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const apiService = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (username, password) => {
  try {
    const response = await apiService.post('/auth/local', {
      identifier: username,
      password: password,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiService;
