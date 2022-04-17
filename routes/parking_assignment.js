const express = require('express');
const allocationController = require('../controllers/parking_assignment');
const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const body = req.body;
        console.log("in route", body.license_plate_number, body.vehicle_type, body.parking_space);
        const result = await allocationController.create(body.license_plate_number, body.vehicle_type, body.parking_space);
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
        console.log(req.params.assignment_id);
       const result = await allocationController.update(req.params.assignment_id, body.license_plate_number, body.vehicle_type);
        res.status(200).json(result);
    } catch {
        console.error('Failed to update parking allocation:', err);
        res.status(500).json({ message: err.toString() });
    }

    next();
});

router.delete('/:assignment_id', async(req, res, next) => {
    try {
        const body = req.body;
        const result = await allocationController.deleteAllocation(req.params.assignment_id);
        res.status(204).json(result);
    } catch {
        console.error('Failed to delete parking allocation:', err);
        res.status(500).json({ message: err.toString() });
    }
    next();
});

module.exports = router;