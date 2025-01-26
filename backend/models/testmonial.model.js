/* call package */
const mongoose = require('mongoose');



/* call package function */
const testmonialStructure = new mongoose.Schema({
    subject : {
        type : String,
        required : true
    },
    personName : {
        type : String,
        required : true
    },
    personRole : {
        type : String,
        required : true
    },
    testmonialEnable : {
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
const testmonialTable = mongoose.model('testmonial' , testmonialStructure);



/* export functions */
module.exports = {
    testmonialTable
}