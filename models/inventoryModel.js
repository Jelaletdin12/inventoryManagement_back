const { Pool } = require('pg');
const db = require('../db');



const inventory = `CREATE TABLE Inventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'available',
    count INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_to_user_id INT REFERENCES Users(id) ON DELETE SET NULL
);`
const createTable = async () => {
    try {
      await db.query(inventory);
      console.log('inventory tablosu başarıyla oluşturuldu.');
    } catch (err) {
      console.error('inventory tablo oluşturulurken hata meydana geldi:', err);
    }
  };
  createTable();

module.exports = db;