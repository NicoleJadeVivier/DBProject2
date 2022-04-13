const express = require('express');
const employeeController = require('../controllers/employee');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        
        const result = await employeeController.authenticateEmployee(body.username, body.password);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to authenticate employee:', err);
        res.status(401).json({ message: err.toString() });
    }

    next();
})

module.exports = router;