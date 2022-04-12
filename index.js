const express = require('express');
const knex = require('./db/knex');
const spotRoutes = require('./routes/spot');
const employeeRoutes = require('./routes/employee');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get('/health', async (request, response, next) => {
    const query = knex('stadium').select('stadium_name');
    const result = await query;
    console.log(result);
    const responseBody = { status: 'up', port };
    response.json(responseBody);
   
    next();
});

app.use('/spot', spotRoutes);
app.use('/employee', employeeRoutes);

app.listen(port, () => {
    console.log(`This app is listening on port ${port}`);
});
