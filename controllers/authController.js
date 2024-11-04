const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
const catchAsync = require("./../utils/catchAsync");
const { authenticateToken, authorizeAdmin } = require("./authMiddleware");
require("dotenv").config();

// Admin ulanyjysyny döretmek
exports.createAdmin = catchAsync(async (req, res) => {
  const { name, surname, password, email, phone, position } = req.body;

  try {
    // Şifrlemek
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      "INSERT INTO Users (name, surname, password, email, phone, position, role) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [name, surname, hashedPassword, email, phone, position, "admin"]
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Giriş
exports.logIn = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM Users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword)
      return res.status(401).json({ message: "Invalid credentials" });

    // JWT döretmek
    const token = jwt.sign(
      { userId: user.rows[0].id, role: user.rows[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

exports.createEmployee = catchAsync(async (req, res) => {
  const { name, surname, password, email, phone, position } = req.body;

  // Parolayı şifrele
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Yeni çalışanı veritabanına ekle
  const newEmployee = await pool.query(
    "INSERT INTO Users (name, surname, password, email, phone, position, role) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [name, surname, hashedPassword, email, phone, position, "employee"]
  );

  res.status(201).json(newEmployee.rows[0]);
});

exports.getAllEmployee = catchAsync(async (req, res) => {
  try {
    const employeesWithInventory = await pool.query(
      `
        SELECT 
            u.id AS employee_id,
            u.name AS employee_name,
            u.surname AS employee_surname,
            u.email AS employee_email,
            u.phone AS employee_phone,
            u.position AS employee_position,
            u.created_at AS employee_created_at,
            i.id AS inventory_id,
            i.name AS inventory_name,
            i.price AS inventory_price,
            i.status AS inventory_status,
            i.count AS inventory_count
        FROM Users u
        LEFT JOIN Inventory i ON u.id = i.assigned_to_user_id
        WHERE u.role = $1
        ORDER BY u.id
    `,
      ["employee"]
    );

    // Maglumatlary işgäriň ID-ine görä toparlamak
    const result = {};
    employeesWithInventory.rows.forEach((row) => {
      const employeeId = row.employee_id;

      // Täze işgäri hasaba al
      if (!result[employeeId]) {
        result[employeeId] = {
          id: employeeId,
          name: row.employee_name,
          surname: row.employee_surname,
          email: row.employee_email,
          phone: row.employee_phone,
          position: row.employee_position,
          created_at: row.employee_created_at,
          inventory: [],
        };
      }

      // Inventary işgäriň inventar sanawyna goşmak
      if (row.inventory_id) {
        result[employeeId].inventory.push({
          id: row.inventory_id,
          name: row.inventory_name,
          price: row.inventory_price,
          status: row.inventory_status,
          count: row.inventory_count,
        });
      }
    });

    res.json(Object.values(result));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
