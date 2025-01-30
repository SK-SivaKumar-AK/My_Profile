/* call package */
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const path = require('path');



/* call package function */
dotEnv.config({
    path : path.join(__dirname , '.env')
});



/* Call another files */



/* Call another files functions and original functions */
const connectDatabase = () => {
    const dbUrl = (process.env.NODE_ENV === 'Production') ? process.env.PRODUCTION_DB_URL : process.env.DEVELOPMENT_DB_URL;
    mongoose.connect(dbUrl).then((connect) => {
        console.log(`Database is connected in ${connect.connection.host}`);
    }).catch((error) => {
        console.log(error.message);
    })
};



/* export functions */
module.exports = {
    connectDatabase
}

