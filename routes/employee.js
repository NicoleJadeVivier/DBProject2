const express = require('express');
const employee = require('../models/employee');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        if (!body.hasOwnProperty('username') || !body.hasOwnProperty('password')) {
            throw 'Please provide username and password';
        }
        const result = await employee.createAccount(body.username, body.password);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to create new account:', err);
        res.status(400).json({ message: err.toString() });
    }

    next();
});

module.exports = router;