const knex = require('../db/knex');

const SPOT_TABLE = 'parking_space';

const getSpots = async () => {
    return await knex(SPOT_TABLE);
}

const getOpenSpots = async () => {
    return await knex(SPOT_TABLE).where('is_available', true);
}

const getSpotsFromStadium = async (stadium) => {
    return await knex(SPOT_TABLE).where({ stadium });
}

// const getOpenSpotsFromStadium = async (stadium) => {
//     return await knex(SPOT_TABLE).where({ })
// }

module.exports = {
    getSpots,
    getOpenSpots,
    getSpotsFromStadium
};