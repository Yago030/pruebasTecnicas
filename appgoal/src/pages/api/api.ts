// api.ts

import axios from 'axios';

interface AssetPrice {
  pair: string;
  price: number;
}

export async function fetchPricesForAsset(assetId: string): Promise<AssetPrice[]> {
  console.log(assetId);
  try {
    const response = await axios.get(`https://api.saldo.com.ar/v3/systems/${assetId}`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching asset prices:', error);
    return [];
  }
}
