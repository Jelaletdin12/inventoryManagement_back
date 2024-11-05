const express = require("express");
const pool = require("../db");
const catchAsync = require("./../utils/catchAsync");

// Inventar eklemek (sadece admin)
exports.createInventory = catchAsync(async (req, res) => {
  const { name, price, count, status } = req.body;
  const newInventory = await pool.query(
    "INSERT INTO Inventory (name, price, count, status) VALUES($1, $2, $3, $4) RETURNING *",
    [name, price, count, status]
  );
  res.status(201).json(newInventory.rows[0]);
});

// Tüm inventarları listelemek
exports.getAllInventories = catchAsync(async (req, res) => {
  const result =
    req.user.role === "admin"
      ? await pool.query("SELECT * FROM Inventory")
      : await pool.query(
          "SELECT * FROM Inventory WHERE assigned_to_user_id = $1",
          [req.user.userId]
        );
  res.json(result.rows);
});

// Inventar güncelleme
exports.updateInventory = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { name, price, count, status } = req.body;
  const updatedInventory = await pool.query(
    "UPDATE Inventory SET name = $1, price = $2, count = $3, status = $4 WHERE id = $5 RETURNING *",
    [name, price, count, status, id]
  );
  if (updatedInventory.rows.length === 0) {
    return res.status(404).json({ message: "Inventory not found" });
  }
  res.json(updatedInventory.rows[0]);
});


// Inwentary işgäre birikdirmek (diňe admin)
exports.assignInventory = catchAsync( async (req, res) => {
    const { inventoryId, userId } = req.body;

    try {
        // Ulanyjy ID-sini barlamak
        const user = await pool.query('SELECT * FROM Users WHERE id = $1 AND role = $2', [userId, 'employee']);
        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        // Inwentary barlamak
        const inventory = await pool.query('SELECT * FROM Inventory WHERE id = $1', [inventoryId]);
        if (inventory.rows.length === 0) {
            return res.status(404).json({ message: 'Inventory not found' });
        }

        // Inwentary işgäriň ID-sine birikdirmek
        const updatedInventory = await pool.query(
            'UPDATE Inventory SET assigned_to_user_id = $1 WHERE id = $2 RETURNING *',
            [userId, inventoryId]
        );

        res.json({
            message: `Inventory with ID ${inventoryId} assigned to employee with ID ${userId}`,
            inventory: updatedInventory.rows[0],
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});
