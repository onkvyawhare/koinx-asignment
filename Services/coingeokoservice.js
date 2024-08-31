const axios = require('axios');
const Price = require('../Models/Price');

const fetchAndStorePrice = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
        params: {
          ids: 'ethereum',
          vs_currencies: 'inr'
        }
      
    });
    const price = response.data.ethereum.inr;
    await Price.create({ price, timestamp: new Date() });
  } catch (error) {
    console.error(`CoinGecko API request failed: ${error.message}`);
  }
};

const getLatestPrice = async () => {
  try {
    const price = await Price.findOne().sort({ timestamp: -1 });
    return price.price;
  } catch (error) {
    throw new Error(`Failed to get latest price: ${error.message}`);
  }
};

module.exports = { fetchAndStorePrice, getLatestPrice };

