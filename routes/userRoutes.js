// userRoutes.js
const express = require('express');
const authController = require('./../controllers/authController');
const { authenticateToken, authorizeAdmin } = require('../controllers/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, authController.getAllEmployee); // Tekrarlanan authenticateToken kaldırıldı
router.post('/adminRegister', authController.createAdmin);
router.post('/login', authController.logIn);
router.post('/register-employee', authenticateToken, authorizeAdmin, authController.createEmployee);

module.exports = router;
