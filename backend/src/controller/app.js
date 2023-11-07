const express = require('express');
const bodyParser = require('body-parser');
const products = require('../model/products.js');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


require('dotenv').config();






app.get('/getFeaturedImages', async (req, res) => {
  try {
    const result = await products.getAllFeaturedProducts();
    
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.get('/getAllProducts', async (req, res) => {
  try{
    const result = await products.getAllProducts();
   
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.get('/getProductsByCategory/:category', async (req, res) => {

  try{
    const result = await products.getProductsByCategory(req.params.category);
    
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
});



module.exports = app;
