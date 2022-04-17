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
    
};

const createAccount = async (username, password) => {
    const result = await Employee.createAccount(username, password);
    return result;
};

const findEmployeeByUsername = async (username) => {
    const result = await Employee.findEmployeeByUsername(username);
    return result;
};

module.exports = {
    authenticateEmployee,
    createAccount,
    findEmployeeByUsername
};