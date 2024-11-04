const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'inventorymanagement',
  password: '03122002',
  port: 5432,
});

pool.connect()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Can not connected to database', err);
  });

module.exports = pool;