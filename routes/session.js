const express = require('express');
const employeeController = require('../controllers/employee');
const {authenticateJWT} = require('../middleware/auth');

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
});

router.get('/', authenticateJWT, async (req, res, next) => {
    try {
        const user = req.user;
        const result = await employeeController.findEmployeeByUsername(user.username);
        res.status(201).json(result);
    } catch (err) {
        console.error('Failed to load current user:', err);
        res.sendStatus(500).json({ message: err.toString() });
    }

    next();
});

module.exports = router;