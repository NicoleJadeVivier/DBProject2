const express = require('express');

// Import any route handlers here.


// Import any middleware here
const { createModelsMiddleware, disconnectFromDatababaseMiddleware } = require('./middleware/model-middleware');

// Start by defining the express app instance
const app = express();
const port = 3000;

app.use(createModelsMiddleware);

app.get('/health', (request, response, next) => {
    const responseBody = { status: 'up', port };
    response.json(responseBody);
    // next() is how we tell express to continue through the middleware chain
    next();
});

// The last step of a request middleware chain is to disconnect from the DB.
app.use(disconnectFromDatababaseMiddleware);

// Now that we've configured the app, make it listen for incoming requests
app.listen(port, () => {
    console.log(`This app is listening on port ${port}`);
});
