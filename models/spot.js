const knex = require('../knex');

const SPOT_TABLE = 'parking_space';

const getSpots = async () => {
    return await knex(SPOT_TABLE);
}

const getOpenSpots = async () => {
    return await knew(SPOT_TABLE).where('is_available', true);
}

module.exports = {
    getSpots,
    getOpenSpots
};