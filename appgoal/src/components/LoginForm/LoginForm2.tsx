import { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Estado para el mensaje de error
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = { email, password };

    const response = await fetch('https://panel.saldo.com.ar/bridge/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      const data = await response.json();
      const token = data.token;

      // Almacenar el token
      localStorage.setItem('authToken', token);

      // Redirigir a la página de sistemas
      router.push('/systems');
    } else {
      const error = await response.json();
      const message = error.message || 'Error al iniciar sesión';

      // Mostrar mensaje de error al usuario
      setError(message);
      console.log("Error al conectarse");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>} {/* Mostrar mensaje de error */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <input 
    type="email" 
    value={email} 
    onChange={(e) => setEmail(e.target.value)} 
    placeholder="Email" 
    className="w-full px-4 py-2 mb-4 bg-gray-100 text-gray-800 rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
  />
  <input 
    type="password" 
    value={password} 
    onChange={(e) => setPassword(e.target.value)} 
    placeholder="Contraseña" 
    className="w-full px-4 py-2 mb-4 bg-gray-100 text-gray-800 rounded-md focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500"
  />
  <button 
    type="submit" 
    className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
  >
    Ingresar
  </button>
      </form>
    </div>
  );
};

export default LoginPage;
