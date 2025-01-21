/* call package */
const mongoose = require('mongoose');



/* call package function */
const projectStructure = new mongoose.Schema({
    projectName : {
        type : String,
        required : true
    },
    projectDescription : {
        type : String,
        required : true
    },
    projectImage : {
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
const projectTable = mongoose.model('project' , projectStructure);



/* export functions */
module.exports = {
    projectTable
}


