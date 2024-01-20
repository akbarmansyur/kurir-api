const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
const rajaOngkirApiKey = '1e88f62b77156126b2c84c404f981489';
app.use(express.json());
app.get('/province', async (req, res) => {
    try {
        const response = await axios.get('https://api.rajaongkir.com/starter/province', {
          headers: {
            key: rajaOngkirApiKey,
          },
        });
    
        const province = response.data.rajaongkir.results;
        res.json(province);
      } catch (error) {
        console.error('Error fetching data from Raja Ongkir API:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

app.get('/city', async (req, res) => {
    try {
      const {id} = req.query;
      
  
      const response = await axios.get(`https://api.rajaongkir.com/starter/city?province=${id}`, {
        headers: {
          key: rajaOngkirApiKey,
        },
      });
  
      const cityData = response.data.rajaongkir.results;
      res.json(cityData);
    } catch (error) {
      console.error('Error fetching data from Raja Ongkir API:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/cost', async (req, res) => {
    try {
      const { origin, destination, weight, courier } = req.query;
  
      const response = await axios.post(
        'https://api.rajaongkir.com/starter/cost',
        {
          origin,
          destination,
          weight,
          courier,
        },
        {
          headers: {
            key: rajaOngkirApiKey,
            'Content-Type': 'application/json',
          },
        }
      );
  
      const shippingCostData = response.data.rajaongkir.results;
      res.json(shippingCostData);
    } catch (error) {
      console.error('Error fetching shipping cost from Raja Ongkir API:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});