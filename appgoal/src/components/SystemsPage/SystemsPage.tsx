// systemsPage.tsx
import React, { useState, useEffect } from 'react';

const SystemsPage: React.FC = () => {
  const [assets, setAssets] = useState<any[]>([]);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.saldo.com.ar/v3/systems');
        if (response.ok) {
          const data = await response.json();
          setAssets(data); 
          console.log(data); //a ver que envio
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
    <div>
      <h1>Systems Page</h1>
      <h2>Activos disponibles:</h2>
      <ul>
        {assets.map((asset: any) => (
          <li key={asset.id}>{asset.name}</li> // Muestra el nombre de cada activo en una lista
        ))}
      </ul>
    </div>
  );
};

export default SystemsPage;
