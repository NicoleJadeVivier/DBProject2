const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');

const accessTokenSecret = 'mysupercoolsecret';

const authenticateEmployee = async (username, password) => {
    const employee = await Employee.authenticateEmployee(username, password);
    if (employee === null) {
        return employee;
    }

    const accessToken = jwt.sign({ ...employee, claims: ['employee'] }, accessTokenSecret);

    return accessToken;
    
}

module.exports = {
    authenticateEmployee
};