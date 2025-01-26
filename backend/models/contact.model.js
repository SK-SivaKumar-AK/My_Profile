/* call package */
const mongoose = require('mongoose');



/* call package function */
const contactStructure = new mongoose.Schema({
    streetName : {
        type : String,
        required : true
    },
    areaName : {
        type : String,
        required : true
    },
    cityName : {
        type : String,
        required : true
    },
    stateName : {
        type : String,
        required : true
    },
    countryName : {
        type : String,
        required : true
    },
    pincode : {
        type : Number,
        required : true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    profileEnable : {
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
const contactTable = mongoose.model('contact' , contactStructure);



/* export functions */
module.exports = {
    contactTable
}