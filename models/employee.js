const knex = require('../db/knex');
const bcrypt = require('bcrypt');

const EMPLOYEE_TABLE = 'employee';

const createAccount = async (employee_id, username, password) => {
    console.log('Raw password:', password);
    const salt = await bcrypt.genSalt(10);
    console.log('Password salt', salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed password', hashedPassword);

    const query = knex(EMPLOYEE_TABLE).insert({employee_id, username, password: hashedPassword});
    console.log('Raw query for createAccount:', query.toString());
    const result = await query;

    return result;
};

module.exports = {
    createAccount
};
