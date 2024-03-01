// NotFoundPage.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const NotFoundPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Verifica el estado de autenticación del usuario
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Redirige a /systems si el usuario está autenticado, de lo contrario, redirige a /login
    router.push(isLoggedIn === 'true' ? '/systems' : '/login');
  }, []);

  return null;
};

export default NotFoundPage;
