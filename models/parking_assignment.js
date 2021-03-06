const knex = require('../db/knex');

const ALLOCATION_TABLE = 'parking_assignment';
const CAR_TABLE = 'car';

const createAllocation = async (license_plate_number, vehicle_type, parking_space) => {
    console.log("in controller", license_plate_number, vehicle_type, parking_space);
    const cars =  await knex(CAR_TABLE).where('license_plate_number', license_plate_number);
    if (cars.length == 0) {
        await knex(CAR_TABLE).insert({license_plate_number, vehicle_type});
    }
    const assignment_id = await knex(ALLOCATION_TABLE).insert({parking_space, license_plate: license_plate_number, vehicle_type});
    const result = await knex(ALLOCATION_TABLE).where('assignment_id', assignment_id);
    return result;
};

const updateAllocation = async (assignment_id, license_plate_number, vehicle_type) => {
    const cars =  await knex(CAR_TABLE).where('license_plate_number', license_plate_number);
    if (cars.length == 0) {
        await knex(CAR_TABLE).insert({license_plate_number, vehicle_type});
    }
    await knex(ALLOCATION_TABLE).where('assignment_id', assignment_id).update({
        license_plate: license_plate_number, vehicle_type
    });
    result = await knex(ALLOCATION_TABLE).where('assignment_id', assignment_id);
    return result;
};

const deleteAllocation = async (allocation_id) => {
    const result = await knex(ALLOCATION_TABLE).where('assignment_id', allocation_id).del();
    return result;
};



module.exports = {
    createAllocation,
    updateAllocation,
    deleteAllocation
};