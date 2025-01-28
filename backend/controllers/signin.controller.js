/* call package */
const dotEnv = require('dotenv');
const path = require('path');
const jwt = require('jsonwebtoken');



/* call package function */
dotEnv.config({
    path : path.join(__dirname , '..' , 'config' , '.env')
});



/* Call another files */
const { userTable } = require('../models/user.model');



/* Call another files functions and original functions */
const userSignin = async (req , res) => {
    try {

        const { userName , userEmail , userPassword } = req.body;
        const { image , resume } = req.files;
        
        const addUser = new userTable({
            userName : userName,
            userEmail : userEmail,
            userPassword : userPassword,
            userProfileImage : image[0].filename,
            userResume : resume[0].filename,
            userEnable : true
        });

        const addedUser = await addUser.save();

        return res.status(200).json({
            Result : true,
            Message : 'SignIn Successfully!',
            data : addedUser
        });

    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });

    }
}

const userLogin = async (req , res) => {
    try {

        const { userEmail , userPassword } = req.body;
       
        const checkUser = await userTable.findOne({ userEmail : userEmail});
        if(!checkUser){
            return res.status(200).json({
                Result : false,
                Message : 'Invalid Email!'
            });
        }

        const checkPassword = await checkUser.comparePassword(userPassword);
        if(!checkPassword){
            return res.status(200).json({
                Result : false,
                Message : 'Invalid Password!'
            });
        }

        const accessToken = await jwt.sign(
            {
                userId : checkUser._id
            },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            {
                expiresIn : process.env.JWT_ACCESS_TOKEN_EXP
            }
        );
        res.cookie('accessToken' , accessToken , {
            secure : true,
            maxAge : 60 * 60 * 1000,
            httpOnly: true,
            sameSite: 'None'
        });

        const refreshToken = await jwt.sign(
            {
                userId : checkUser._id
            },
            process.env.JWT_REFRESH_TOKEN_SECRET,
            {
                expiresIn : process.env.JWT_REFRESH_TOKEN_EXP
            }
        );
        res.cookie('refreshToken' , refreshToken , {
            secure : true,
            maxAge : 120 * 60 * 1000,
            httpOnly: true,
            sameSite: 'None'
        });
        


        return res.status(200).json({
            Result : true,
            Message : 'Login SuccessFully!',
            data : checkUser
        });

    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });

    }
}

const userData = async (req , res) => {
    try {
        
        const userId = req.userId;

        const userData = await userTable.find({_id : userId});
        return res.status(200).json({
            Result : true,
            Message : 'Read Successfully!',
            data : userData
        });

    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });

    }
};

const userInfoUpdate = async (req , res) => {
    try {

        const Id = req.params.id;
        const { userName , userEmail , userPassword , userEnable } = req.body;

        const updateUser = {
            userName : userName,
            userEmail : userEmail,
            userPassword : userPassword,
            userEnable : userEnable
        };
        if(req.files && req.files.image && req.files.image.length > 0){
            updateUser.userProfileImage = req.files.image[0].filename;
        }
        if(req.files && req.files.resume && req.files.resume.length > 0){
            updateUser.userResume = req.files.resume[0].filename;
        }

        const updatedUser = await userTable.findOneAndUpdate( {_id : Id} , updateUser , {new:true});

        return res.status(200).json({
            Result : true,
            Message : 'Updated Successfully!',
            data : updatedUser
        });

    } catch (error) {

        return res.status(404).json({
            Result : false,
            Message : error.message
        });

    }
}

const userLogout = (req , res) => {
    try {

        res.clearCookie('accessToken', { 
            secure: true, 
            httpOnly: true, 
            sameSite: 'None' 
        });
        res.clearCookie('refreshToken', { 
            secure: true, 
            httpOnly: true, 
            sameSite: 'None' 
        });
        return res.status(200).json({
            Result : true,
            Message : 'Logout SuccessFully!',
            data : ''
        });

    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });

    }
}



/* export functions */
module.exports = {
    userSignin,
    userLogin,
    userData,
    userInfoUpdate,
    userLogout
}


