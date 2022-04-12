const express = require('express');
const employee = require('../models/employee');
const router = express.Router();

router.post('/newAccount', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await employee.createAccount(body.employee_id, body.username, body.password);
        res.status(201).json(result);
    } catch {
        console.error('Failed to create new account:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
});

module.exports = router;