const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'inventorymanagement',
<<<<<<< HEAD
  password: 'postgres',
=======
  password: '03122002',
>>>>>>> b2f927244c3a85658fe288c057975d77b699003b
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