const express = require("express");
const inventoryController = require("./../controllers/inventoryController");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../controllers/authMiddleware");

const router = express.Router();

// Tüm inventarları listeleme ve inventar ekleme (sadece admin ekleyebilir)
router
  .route("/")
  .get(authenticateToken, inventoryController.getAllInventories)
  .post(authenticateToken, authorizeAdmin, inventoryController.createInventory);
  
router
  .route("/assignInventory")
  .post(authenticateToken, authorizeAdmin, inventoryController.assignInventory);

// Inventar güncelleme (sadece admin güncelleyebilir)
router
  .route("/:id")
  .put(authenticateToken, authorizeAdmin, inventoryController.updateInventory);

module.exports = router;
