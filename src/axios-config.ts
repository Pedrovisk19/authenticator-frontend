import axios from 'axios';
import { toast } from 'react-toastify';
import { getPermissions } from './lib/permissions'; // helper para pegar permissões do localStorage

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const permissions = getPermissions();
  const method = (config.method || '').toUpperCase();

  if (
    ['POST', 'PATCH', 'PUT', 'DELETE'].includes(method) &&
    !permissions?.allowEdit
  ) {
    // Cancela a requisição para cair no catch
    return Promise.reject(new axios.Cancel('Você não possui permissão para realizar esta ação!'));
  }

  // Se liberado, adiciona token e segue
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
