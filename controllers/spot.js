const spot = require('../models/spot');

const getSpots = async (stadium, lot, available) => {
    let result;
    console.log(stadium);
    if (stadium) {
        if (lot) {
            if (available) {
                result = await spot.getOpenSpotsFromLot(lot);
            } else result = await spot.getSpotsFromLot(lot);
        } else result = await spot.getSpotsFromStadium(stadium);
    } else result = await spot.getSpots();
    return result;
};

module.exports = {
    getSpots
};