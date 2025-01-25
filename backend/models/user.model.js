/* call package */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



/* call package function */
const userStructure = new mongoose.Schema({
    userName : {
        type : String,
        required : true
    },
    userEmail : {
        type : String,
        required : true,
        unique : true
    },
    userPassword : {
        type : String,
        required : true
    },
    userProfileImage : {
        type : String,
        required : true
    }
});



/* Call another files */



/* Call another files functions and original functions */
userStructure.pre('save' , async function(next){
    this.userPassword = await bcrypt.hash(this.userPassword , 10);
    next();
});
userStructure.pre('findOneAndUpdate' , async function(next){
    const update = this.getUpdate();
    if (update.userPassword) {
        // If userPassword is provided, hash it before saving
        update.userPassword = await bcrypt.hash(update.userPassword, 10);
    } else {
        // If userPassword is not provided, don't change the current password
        const existingUser = await this.model.findOne(this.getQuery());
        update.userPassword = existingUser.userPassword;
    }
    next();
});

userStructure.methods.comparePassword = async function(userPassword){
    return await bcrypt.compare(userPassword , this.userPassword);
} 

const userTable = mongoose.model('user' , userStructure);



/* export functions */
module.exports = {
    userTable
}


