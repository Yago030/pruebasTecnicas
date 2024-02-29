//probando sin axios , usando fetch
import axios from 'axios';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('https://api.saldo.com.ar/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};
