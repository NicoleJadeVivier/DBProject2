const mysql = require('mysql');
const util = require('util');

const connectToDatabase = async() => {
    try {
        const DBConnection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            insecureAuth: true,
            database: 'parking_schema'
        });

         // Actually create the connection
         const DBCreateConnection = util.promisify(DBConnection.connect).bind(DBConnection);
         await DBCreateConnection();
 
         // We return two things: a function that lets us run queries, and another to
         // disconnect from the DB at the end of a route. We don't want connections lingering
         // because we didn't clean up
         const DBQuery = util.promisify(DBConnection.query).bind(DBConnection);
         const disconnect = () => DBConnection.end();
         return { DBQuery, disconnect };
 
     } catch (err) {
         console.error('There was an error with the DB', err);
         throw err;
     }
};

module.exports = connectToDatabase;
    
