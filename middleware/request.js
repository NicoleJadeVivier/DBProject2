const requestDetails = (req, res, next) => {
    console.log("In middleware");
    console.log("HTTP verb: ", req.method);
    console.log("url: ", req.originalUrl);
    console.log("timestamp: ", req.timestamp);
    console.log("query params: ", req.params);
    console.log("req body: ", req.body);

    next();
}

module.exports = {requestDetails}