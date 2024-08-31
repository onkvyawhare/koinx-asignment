const axios=require('axios');

const{ETHERSCAN_API_KEY}=process.env;


const fetchTransactions = async (address) => {
    try {
      const response = await axios.get(`https://api.etherscan.io/api`, {
        params: {
          module: 'account',
          action: 'txlist',
          address,
          startblock: 0,
          endblock: 99999999,
          sort: 'asc',
          apiKey: ETHERSCAN_API_KEY
        }
      });
      return response.data.result;
    } catch (error) {
      throw new Error(`Etherscan API request failed: ${error.message}`);
    }
  };
  
  module.exports = { fetchTransactions };