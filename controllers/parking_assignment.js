const allocation = require('../models/parking_assignment');

const create = async (license_plate_number, vehicle_type, parking_space) => {
    console.log("in controller");
    return await allocation.createAllocation(license_plate_number, vehicle_type, parking_space);
};

const update = async (assignment_id, license_plate_number, vehicle_type) => {
    return await allocation.updateAllocation(assignment_id, license_plate_number, vehicle_type);
};

const deleteAllocation = async (assignment_id) => {
    return await allocation.deleteAllocation(assignment_id);
};

module.exports = {
    create,
    update,
    deleteAllocation
};