const knex = require('../db/knex');

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

// const getOpenSpotsFromStadium = async (stadium) => {
//     const query1 = await knex(SPOT_TABLE).where('stadium', stadium);
//     const query2 = await knex(SPOT_TABLE).where('')
// }

const getUserMessage = async (message) => {
    const query = await knex(NOTIFICATIONS).where('user_id', user_id);
    const query1 = await knex(NOTIFICATIONS).where('message', message);
    const result = [await query, query1];
    return result;
}

module.exports = {
    getSpots,
    getOpenSpots,
    getSpotsFromStadium
};