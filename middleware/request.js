const requestDetails = (req, res, next) => {
    console.log("HTTP verb: ", req.method);
    console.log("URL: ", req.originalUrl);
    console.log("Timestamp: ", new Date());
    console.log("Query params: ", req.query);
    console.log("Request body: ", req.body);

    next();
}

module.exports = {requestDetails}