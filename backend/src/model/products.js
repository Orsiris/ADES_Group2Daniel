require('dotenv').config();

const sql = require('../config/database.js')

const productsDB = {
  getAllFeaturedProducts: async function () {
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

  getAllProducts: async function () {
    try {
      const result = await sql`SELECT name, description, price, category, stockquantity, imageurl FROM homesteadhaven.products`;
      return result;
    } catch (err) {
      console.error(err);
      throw err; // You can choose to handle the error differently here
    }
  },

  getProductsByCategory: async function (category) {
    try {
      const result = await sql`
              SELECT p.* FROM homesteadhaven.products p INNER JOIN homesteadhaven.Category c ON p.category = c.category_id WHERE c.category_name = ${category}
            `;
      return result;
    } catch (err) {
      console.error(err);
      throw err; // You can choose to handle the error differently here
    }
  }
};





module.exports = productsDB;