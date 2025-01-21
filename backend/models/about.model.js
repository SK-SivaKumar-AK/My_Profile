/* call package */
const mongoose = require('mongoose');



/* call package function */
const aboutStructure = new mongoose.Schema({
    skillName : {
        type : String,
        required : true
    },
    skillImage : {
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
const aboutTable = mongoose.model('about' , aboutStructure);



/* export functions */
module.exports = {
    aboutTable
}


