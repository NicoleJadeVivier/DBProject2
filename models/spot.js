const knex = require('../knex');

const SPOT_TABLE = 'spot';

const getSpots = async () => {
    return await knex(SPOT_TABLE);
}

module.exports = {
    getSpots
};