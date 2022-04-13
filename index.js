const express = require('express');
const knex = require('./db/knex');
const spotRoutes = require('./routes/spot');
const employeeRoutes = require('./routes/employee');
const sessionRoutes = require('./routes/session');
const allocationRoutes = require('./routes/parking_assignment');
const bodyParser = require('body-parser');

const {authenticateJWT} = require('./middleware/auth');
const {requestDetails} = require('./middleware/request');

const app = express();
const port = 3000;
app.use(bodyParser.json());

app.get('/health', async (request, response, next) => {
    const responseBody = { status: 'up', port };
    response.json(responseBody);
    next();
});

app.use('/account', requestDetails, employeeRoutes);
app.use('/session', requestDetails,sessionRoutes);
app.use('/spots', requestDetails, authenticateJWT, spotRoutes);
app.use('/allocation', requestDetails,authenticateJWT, allocationRoutes);

app.listen(port, () => {
    console.log(`This app is listening on port ${port}`);
});
