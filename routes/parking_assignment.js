const express = require('express');
const allocation = require('../models/parking_assignment');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        const result = await allocation.createAllocation(body.license_plate_number, body.vehicle_type, body.parking_space);
        res.status(201).json(result);
    } catch {
        console.error('Failed to create new parking allocation:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
});

router.put('/:assignment_id', async (req, res, next) => {
    try {
        const body = req.body;
        console.log(body);
        console.log(req.params.assignment_id);
        const result = await allocation.updateAllocation(req.params.assignment_id, body.license_plate_number, body.vehicle_type);
        res.status(201).json(result);
    } catch {
        console.error('Failed to update parking allocation:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
});

module.exports = router;