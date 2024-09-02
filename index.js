const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true,serverSelectionTimeoutMS: 30000  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

 


const transactionRoutes = require('./Controllers/Transactionscontroller');
const priceRoutes = require('./Controllers/Pricecontroller');

app.use('/transactions', transactionRoutes);
app.use('/price', priceRoutes);

// Fetch price every 10 minutes
cron.schedule('*/10 * * * *', async () => {
  const priceService = require('./Services/coingeokoservice');
  await priceService.fetchAndStorePrice();
  console.log('Price fetched and stored successfully');
});

const PORT =process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));