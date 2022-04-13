const knex = require('../db/knex');
const bcrypt = require('bcrypt');

const EMPLOYEE_TABLE = 'employee';

const createAccount = async (username, password) => {
    console.log('Raw password:', password);
    const salt = await bcrypt.genSalt(10);
    console.log('Password salt', salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed password', hashedPassword);

    await knex(EMPLOYEE_TABLE).insert({username, password: hashedPassword});
    const result = await knex(EMPLOYEE_TABLE).where({username});

    return result;
};

const findEmployeeByUsername = async (username) => {
    const query = knex(EMPLOYEE_TABLE).where({ username });
    const result = await query;
    return result;
}

const authenticateEmployee = async (username, password) => {
    const employees = await findEmployeeByUsername(username);
    console.log('Results of employee query', employees);
    if (employees.length == 0) {
        console.error(`No employee matched the username: ${username}`);
        return null;
    }
    const employee = employees[0];
    const validPassword = await bcrypt.compare(password, employee.password);
    if (validPassword) {
        delete employee.password;
        return employee;
    }
    return null;
}

module.exports = {
    createAccount,
    findEmployeeByUsername,
    authenticateEmployee
};
