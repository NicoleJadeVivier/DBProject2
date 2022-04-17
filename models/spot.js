const knex = require('../db/knex');

const SPOT_TABLE = 'parking_space';

const getSpots = async () => {
    return await knex(SPOT_TABLE);
};

const getOpenSpots = async () => {
    return await knex(SPOT_TABLE).where('is_available', true);
};

const getSpotsFromStadium = async (stadium) => {
    return await knex(SPOT_TABLE).where('stadium_name', stadium);
};

const getOpenSpotsFromStadium = async (stadium) => {
    return await knex(SPOT_TABLE).where('stadium_name', stadium).where('is_available', true);z 
};

const getSpotsFromLot = async (parking_lot) => {
    return await knex(SPOT_TABLE).where('lot_id', parking_lot);
};

const getOpenSpotsFromLot = async (parking_lot) => {
    return await knex(SPOT_TABLE).where('is_available', true).where('lot_id', parking_lot);
};



module.exports = {
    getSpots,
    getOpenSpots,
    getSpotsFromStadium,
    getOpenSpotsFromStadium,
    getSpotsFromLot,
    getOpenSpotsFromLot
};