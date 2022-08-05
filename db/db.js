require('dotenv').config();
const {Pool} = require ('pg');

const pool = new Pool({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.DBUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

module.exports = pool;


