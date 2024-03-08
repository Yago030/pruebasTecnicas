import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchPricesForAsset } from '../../pages/api/api';
import AssetPrices from '../AssetPrices/AssetPrices';

const SystemsPage: React.FC = () => {
  const router = useRouter();
  const [assets, setAssets] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [selectedAssetPrices, setSelectedAssetPrices] = useState<any[]>([]);
  const [showPrices, setShowPrices] = useState(false); // Estado para mostrar u ocultar los precios
  const [username, setUsername] = useState<string>(''); // Estado para almacenar el nombre de usuario

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
        setUsername('Admin SaldoAr'); // Establece el nombre de usuario cuando el usuario está autenticado
      }
    };

    checkAuthentication();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await fetch('https://api.saldo.com.ar/v3/systems');
      if (response.ok) {
        const data = await response.json();
        console.log(data.id);
        setAssets(data.data);
      } else {
        console.error('Error al obtener la lista de activos');
      }
    } catch (error) {
      console.error('Error al obtener la lista de activos:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  const handleAssetClick = async (assetId: string) => {
    setSelectedAsset(assetId);
    try {
      const prices = await fetchPricesForAsset(assetId);
      console.log('Precios del activo:', prices);
      setSelectedAssetPrices(prices.data.attributes.trend); // Actualiza el estado con los precios obtenidos. el amount no me funcionó , por lo cual use la variable "trend" que era variable
      setShowPrices(true); 
    } catch (error) {
      console.error('Error al obtener los precios del activo:', error);
    }
  };

  const togglePrices = () => {
    setShowPrices(!showPrices); // Cambia el estado para mostrar u ocultar los precios
  };

  return (
    <div className="container mx-auto px-4 py-8 text-lg">
      {isLoggedIn && (
        <div className="flex justify-between items-center mb-4">
          <p>Hola, {username}</p>
          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded-md">Cerrar sesión</button>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4">Systems Page</h1>
      <h2 className="text-xl font-semibold mb-2">Activos disponibles:</h2>
      <ul className="grid grid-cols-4 gap-4">
          {assets.length > 0 ? (
           assets.map((asset: any) => (
           <li key={asset.id} className="bg-cyan-500 bg-00CC99 p-4 rounded-md shadow-md hover:bg-green-200" onClick={() => handleAssetClick(asset.id)}>
                <span className="text-lg">{asset.attributes.name}</span>
             </li>
         ))
          ) : (
         <li className="text-center text-lg text-gray-500 font-semibold border border-gray-300 m-4">No hay activos disponibles</li>
       )}
    </ul>


      {/* Mostrar u ocultar los precios */}
      {selectedAsset && (
        <div>
          <h2 onClick={togglePrices} className="cursor-pointer p-4 m-2 rounded-md  hover:bg-green-200  ">Precios del activo:</h2>
          {showPrices && <AssetPrices prices={selectedAssetPrices} />}
        </div>
      )}
    </div>
  );
};

export default SystemsPage;
