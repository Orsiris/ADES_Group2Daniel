const { Pool } = require('pg');
const postgres = require('postgres');
require('dotenv').config();

const sql = require('../config/database.js')

const featuredImagesDB = {
  getAllFeaturedImages: async function () {
    try {
      const result = await sql`SELECT p.imageurl, p.name, p.description
      FROM homesteadhaven.products p
      INNER JOIN homesteadhaven.featured f ON p.productid = f.productid
      `;
      return result;
    } catch (err) {
      console.error(err);
      throw err; // You can choose to handle the error differently here
    }
  },
};

module.exports = featuredImagesDB;
