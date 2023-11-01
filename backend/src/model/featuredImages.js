const { Pool } = require('pg');
const postgres = require('postgres');
require('dotenv').config();

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: 'require',
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

const featuredImagesDB = {
  getAllFeaturedImages: async function () {
    try {
      const result = await sql`SELECT * FROM public.featured`;
      return result;
    } catch (err) {
      console.error(err);
      throw err; // You can choose to handle the error differently here
    }
  },
};

module.exports = featuredImagesDB;
