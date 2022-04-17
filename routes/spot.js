const express = require('express');
const spotController = require('../controllers/spot');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        console.log("in route", req.query.stadium, req.query.lot, req.query.available);
        const result = await spotController.getSpots(req.query.stadium, req.query.lot, req.query.available);
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to select all parking spaces', err);
        res.status(500).json({message: err.toString() });
    }
    next();
});


module.exports = router;