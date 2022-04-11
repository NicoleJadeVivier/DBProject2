const knex = require('../db/knex');

const SPOT_TABLE = 'parking_space';

const getSpots = async () => {
    return await knex(SPOT_TABLE);
}

const getOpenSpots = async () => {
    return await knex(SPOT_TABLE).where('is_available', true);
}

const getSpotsFromStadium = async (stadium) => {
    return await knex(SPOT_TABLE).where('stadium_name', stadium);
}

const getOpenSpotsFromStadium = async (stadium) => {
    return await knex(SPOT_TABLE).where('stadium_name', stadium).where('is_available', true);
    
}

// const getOpenSpotsFromSP = async (stadium, parking_lot) => {
//     const query1 = await knex(SPOT_TABLE).where('stadium_name', stadium);
//     const query
//     const query2 = await knex(SPOT_TABLE).where('is_available', true);
// }


module.exports = {
    getSpots,
    getOpenSpots,
    getSpotsFromStadium,
    getOpenSpotsFromStadium
};