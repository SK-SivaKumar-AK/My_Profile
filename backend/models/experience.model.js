/* call package */
const mongoose = require('mongoose');



/* call package function */
const experienceStructure = new mongoose.Schema({
    roleName : {
        type : String,
        required : true
    },
    roleDescription : {
        type : String,
        required : true
    },
    year : {
        type : String,
        required : true
    },
    companyName : {
        type : String,
        required : true
    },
    companyLocation : {
        type : String,
        required : true
    },
    experienceEnable : {
        type : Boolean,
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
const experienceTable = mongoose.model('experience' , experienceStructure);



/* export functions */
module.exports = {
    experienceTable
}