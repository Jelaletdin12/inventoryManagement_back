const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token is not valid' });
    }
}

function authorizeAdmin(req, res, next) {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
    next();
}

module.exports = { authenticateToken, authorizeAdmin };