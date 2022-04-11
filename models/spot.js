const knex = require('../knex');

const SPOT_TABLE = 'parking_space';

const getSpots = async () => {
    return await knex(SPOT_TABLE);
}

const getOpenSpots = async () => {
    return await knex(SPOT_TABLE).where('is_available', true);
}

const getSpotsFromStadium = async (stadium) => {
    return await knex(SPOT_TABLE).where('stadium', stadium);
}

const getOpenSpotsFromStadium = async (stadium) => {
    const query1 = await knex(SPOT_TABLE).where('stadium_name', stadium);
    const query2 = await knex(SPOT_TABLE).where('is_available', true);
    const result = [await query1, query2];
    return result;
}


module.exports = {
    getSpots,
    getOpenSpots,
    getSpotsFromStadium,
    getOpenSpots
};