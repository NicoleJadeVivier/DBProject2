const knex = require('../db/knex');

const SPOT_TABLE = 'parking_space';

const getSpots = async () => {
    return await knex(SPOT_TABLE);
}

module.exports = {
    getSpots
};