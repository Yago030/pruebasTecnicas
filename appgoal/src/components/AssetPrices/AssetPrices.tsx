// AssetPrices.tsx
import React from 'react';

interface AssetPricesProps {
  prices: any[];
}

const AssetPrices: React.FC<AssetPricesProps> = ({ prices }) => {
  return (
    <div>
      <h2>Precios del activo:</h2>
      <ul> 
       
          <li >{prices}</li>
    
      </ul>
    </div>
  );
};

export default AssetPrices;
