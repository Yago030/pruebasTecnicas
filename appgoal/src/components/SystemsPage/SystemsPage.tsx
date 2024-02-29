import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const SystemsPage: React.FC = () => {
  const router = useRouter();
  const [assets, setAssets] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(isLoggedIn === 'true');
      if (isLoggedIn !== 'true') {
        console.log('Usuario no autenticado. Redirigiendo a /login...');
        router.push('/login');
      } else {
        console.log('Usuario autenticado. Cargando activos...');
        fetchAssets();
      }
    };

    checkAuthentication();
  }, []); // Solo se ejecuta una vez cuando se carga la página, gracias al arreglo de dependencias vacío []

  const fetchAssets = async () => {
    try {
      const response = await fetch('https://api.saldo.com.ar/v3/systems');
      if (response.ok) {
        const data = await response.json();
        setAssets(data.data);
      } else {
        console.error('Error al obtener la lista de activos');
      }
    } catch (error) {
      console.error('Error al obtener la lista de activos:', error);
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  return (
    <div className="container mx-auto px-4 py-8 text-lg">
      {/* Mostrar el nombre del usuario y el enlace de cierre de sesión si está autenticado */}
      {isLoggedIn && (
        <div className="flex justify-between items-center mb-4">
          <p>Hola, Admin SaldoAr</p>
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-md">Cerrar sesión</button>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4">Systems Page</h1>
      <h2 className="text-xl font-semibold mb-2">Activos disponibles:</h2>
      <ul className="grid grid-cols-4 gap-4">
        {assets.length > 0 ? (
          assets.map((asset: any) => (
            <li key={asset.id} className="bg-cyan-500 bg-00CC99 p-4 rounded-md shadow-md">
              <span className="text-lg">{asset.attributes.name}</span>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No hay activos disponibles</li>
        )}
      </ul>
    </div>
  );
};

export default SystemsPage;
