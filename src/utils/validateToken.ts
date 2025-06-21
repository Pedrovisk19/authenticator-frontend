// utils/validateToken.ts
import axios from 'axios';
import Cookies from 'js-cookie';

export async function validateToken(): Promise<boolean> {
  const token = Cookies.get('token') || localStorage.getItem('token');

  if (!token) {
    redirectToLogin();
    return false;
  }

  try {
    await axios.get('/api/protected-route', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      // Token inválido ou expirado
      redirectToLogin();
    }
    return false;
  }
}

function redirectToLogin() {
  localStorage.removeItem('token');
  Cookies.remove('token');
  window.location.href = '/';
}
