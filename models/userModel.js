const { Pool } = require("pg");
const db = require("../db");

const users = `
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(15),
    position VARCHAR(100),
    role VARCHAR(50) CHECK (role IN ('admin', 'employee')) NOT NULL DEFAULT 'employee',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const createTable = async () => {
  try {
    await db.query(users);
    console.log("users tablosu başarıyla oluşturuldu.");
  } catch (err) {
    console.error(" usersTablo oluşturulurken hata meydana geldi:", err);
  }
};

createTable();

module.exports = db;
