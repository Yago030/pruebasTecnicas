// AssetPrices.tsx
import React from 'react';

interface AssetPricesProps {
  prices: any[];
}

const AssetPrices: React.FC<AssetPricesProps> = ({ prices }) => {
  return (
    <div>
      <ul> 
       
          <li >{prices}</li>
    
      </ul>
    </div>
  );
};

export default AssetPrices;
