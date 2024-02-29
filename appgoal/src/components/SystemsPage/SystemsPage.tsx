import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const SystemsPage: React.FC = () => {
  const router = useRouter();
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isLoggedIn = localStorage.getItem('isLoggedIn'); // Obtener el estado de autenticación
        if (isLoggedIn === 'true') {
          await fetchAssets(); // Cargar los activos si está autenticado
        } else {
          router.push('/login'); // Redirigir al usuario a /login si no está autenticado
        }
      } catch (error) {
        console.error('Error al verificar la autenticación:', error);
      }
    };

    checkAuthentication(); // Llamar a la función de verificación de autenticación al cargar el componente
  }, [router]);

  const fetchAssets = async () => {
    try {
      const response = await fetch('https://api.saldo.com.ar/v3/systems');
      if (response.ok) {
        const data = await response.json();
        setAssets(data.data); // Asegúrate de asignar data.data para obtener el array de activos
      } else {
        console.error('Error al obtener la lista de activos');
      }
    } catch (error) {
      console.error('Error al obtener la lista de activos:', error);
    } finally {
      setLoading(false); // Establecer loading en false después de cargar los activos
    }
  };

  if (loading) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se carga la lista de activos
  }

  return (
    <div className="container mx-auto px-4 py-8 text-lg">
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
