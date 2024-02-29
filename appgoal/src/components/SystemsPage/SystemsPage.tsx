// systemsPage.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
const SystemsPage: React.FC = () => {
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('https://api.saldo.com.ar/v3/systems'); //sacandole el corsaniwhere anduvo aqui, 
        if (response.ok) {
          const data = await response.json();
          setAssets(data.data); // Asegúrate de asignar data.data para obtener el array de activos
        } else {
          console.error('Error al obtener la lista de activos');
        }
      } catch (error) {
        console.error('Error al obtener la lista de activos:', error);
      }
    };

    fetchAssets();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 text-lg">
      <h1 className="text-3xl font-bold mb-4">Systems Page</h1>
      <h2 className="text-xl font-semibold mb-2">Activos disponibles:</h2>
      <ul className="grid grid-cols-4 gap-4">
        {assets.length > 0 ? (
          assets.map((asset: any) => (
            <li key={asset.id} className="bg-cyan-500 p-4 rounded-md shadow-md  ">
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
