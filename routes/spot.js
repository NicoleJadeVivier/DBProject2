const express = require('express');
const spot = require('../models/spot');
const router = express.Router();

router.get('/:stadium?/:lot?/:available?', async (req, res, next) => {
    try {
        let result;
        console.log(req.params.stadium);
        if (req.params.stadium) {
            if (req.params.lot) {
                if (req.params.available) {
                    result = await spot.getOpenSpotsFromLot(req.params.lot);
                } else result = await spot.getSpotsFromLot(req.params.lot);
            } else result = await spot.getSpotsFromStadium(req.params.stadium);
        } else result = await spot.getSpots();
    
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to select all parking spaces', err);
        res.status(500).json({message: err.toString() });
    }
    next();
});


module.exports = router;