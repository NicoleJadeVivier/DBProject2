const spot = require('../models/spot');

const spotProcessor = async (req, res) => {
    try {
        let result;
        console.log(req.query.stadium);
        if (req.query.stadium) {
            if (req.query.lot) {
                if (req.query.available) {
                    result = await spot.getOpenSpotsFromLot(req.query.lot);
                } else result = await spot.getSpotsFromLot(req.query.lot);
            } else result = await spot.getSpotsFromStadium(req.query.stadium);
        } else result = await spot.getSpots();
    
        res.status(200).json(result);
    } catch (err) {
        console.error('Failed to select all parking spaces', err);
        res.status(500).json({message: err.toString() });
    }
};