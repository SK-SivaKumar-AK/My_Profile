/* call package */
const mongoose = require('mongoose');



/* call package function */
const dashboardStructure = new mongoose.Schema({
    mainContent : {
        type : String,
        required : true
    },
    subContent : {
        type : String,
        required : true
    },
    contentEnable : {
        type : Boolean,
        required : true
    },
    userImage : {
        type : String,
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    }
});


/* Call another files */



/* Call another files functions and original functions */
const dashboardTable = mongoose.model('dashboard' , dashboardStructure);



/* export functions */
module.exports = {
    dashboardTable
}


