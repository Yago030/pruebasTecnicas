// LoginForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://panel.saldo.com.ar/bridge/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        console.log('Inicio de sesión exitoso:', response);
        localStorage.setItem('isLoggedIn', 'true'); // Guardar estado de autenticación en el almacenamiento local
        onLoginSuccess();
        router.push('/systems');
      } else {
        console.log('Error en el inicio de sesión:', response);
        let errorMessage = 'Error al iniciar sesión';
        try {
          const data = await response.json();
          if (data.message) {
            errorMessage = data.message;
          }
        } catch (error) {
          console.error('Error al analizar la respuesta:', error);
        }
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Ups... Ha ocurrido un error.');
    }
  };

  return (
    <form className='max-w-md mx-auto p-4 bg-white shadow-md rounded-md' onSubmit={handleSubmit}>
      <div className='mb-4'>
        <label className='block text-sm font-medium text-gray-700' htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          className='mt-1 px-3 py-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900'
        />
      </div>

      <div className='mb-4'>
        <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          className='mt-1 px-3 py-2 w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900'
        />
      </div>

      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Login</button>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </form>
  );
};

export default LoginForm;
