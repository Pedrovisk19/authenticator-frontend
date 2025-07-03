import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

// Lista de rotas públicas que sempre podem ser acessadas
const publicRoutes = [
  '/auth/login',
  '/auth/signup',
  '/auth/reset-password',
  '/reset-password',
  'email/send-reset'
];

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005',
  withCredentials: true,
});

// Interceptor de requisição: adiciona token
api.interceptors.request.use((config) => {
  const token = Cookies.get('token') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const permissions = JSON.parse(localStorage.getItem('permissions') || '{}');
  const method = config.method?.toLowerCase();
  const url = config.url ?? '';

  const isPublic = publicRoutes.some((route) => url.includes(route));
  const isUnsafeMethod = ['post', 'put', 'patch', 'delete'].includes(method || '');

  // Se não for rota pública e o método for inseguro, valida permissão
  if (!isPublic && isUnsafeMethod && !permissions?.allowEdit) {
    throw new axios.Cancel('AVocê não tem permissão para realizar esta ação.');
  }

  return config;
});

// Interceptor de resposta: trata erros como token expirado
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isUnauthorized = error.response?.status === 401;
    const isTokenExpired = error.response?.data?.message === 'jwt expired';

    if (isUnauthorized && isTokenExpired) {
      toast.error('Sua sessão expirou. Faça login novamente.');
      localStorage.removeItem('token');
      localStorage.removeItem('permissions');
      Cookies.remove('token');
      setTimeout(() => window.location.href = '/', 2000);
    }

    return Promise.reject(error);
  }
);

export default api;
