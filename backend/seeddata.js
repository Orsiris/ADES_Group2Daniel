const { Pool } = require('pg');
const cloudinary = require('cloudinary').v2;
const config = require('./src/config/config.js');

require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

// Initialize Cloudinary
cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret
});

// Initialize PostgreSQL database connection pool
const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: {
      // Add your SSL options here, such as 'rejectUnauthorized: false' for testing.
      rejectUnauthorized: false,
    },
});

// Function to fetch image URL from Cloudinary
async function getCloudinaryImageUrlsInFolder(folderPath) {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: folderPath
    });

    const imageUrls = result.resources.map(resource => resource.url);
    return imageUrls;
  } catch (error) {
    console.error('Error fetching image URLs from Cloudinary:', error);
    throw error;
  }
}

// Function to populate the "products" table with dummy data
async function populateProductsTable() {
  try {
    const folderPath = 'Bedroom/';
    const imageUrls = await getCloudinaryImageUrlsInFolder(folderPath);

    const client = await pool.connect();
    await client.query('BEGIN');

    for (let i = 1; i <= imageUrls.length; i++) {
      const name = 'Lorem Ipsum Product ' + i + 2;
      const description = 'Lorem ipsum dolor sit amet.';
      const price = 10.00;
      const category = 3; // Replace with the actual category value.
      const stockQuantity = 10;
      const imageUrl = imageUrls[i - 1]; // Index adjusted to start from 0.
      const creationDate = new Date().toISOString();

      const query = {
        text:
          'INSERT INTO homesteadhaven.products (name, description, price, category, stockQuantity, imageurl, creationdate) VALUES($1, $2, $3, $4, $5, $6, $7)',
        values: [name, description, price, category, stockQuantity, imageUrl, creationDate]
      };

      await client.query(query);
    }

    await client.query('COMMIT');
    client.release();
  } catch (error) {
    console.error('Error populating products table:', error);
  }
}

// Example usage:
populateProductsTable()
  .then(() => {
    console.log('Data population completed.');
    pool.end(); // Close the PostgreSQL connection pool when done.
  })
  .catch(err => console.error('Error:', err));
