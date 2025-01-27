/* call package */



/* call package function */



/* Call another files */
const { contactTable } = require('../models/contact.model');



/* Call another files functions and original functions */
const addInfo = async (req , res) => {
    try {
        
        const userId = req.userId;
        const { streetName , areaName , cityName , stateName , countryName , pincode , phoneNumber , profileEnable } = req.body;

        const addInfo = new contactTable({
            streetName : streetName,
            areaName : areaName,
            cityName : cityName,
            stateName : stateName,
            countryName : countryName,
            pincode : pincode,
            phoneNumber : phoneNumber,
            profileEnable : profileEnable,
            userId : userId
        });
        
        const addedInfo = await addInfo.save();
        
        return res.status(200).json({
            Result : true,
            Message : 'Added SuccessFully!',
            data : addedInfo
        });

    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });

    }
};

const readInfo = async (req , res) => {
    try {
        
        const userId = req.userId;

        const readInfo = await contactTable.find({userId : userId});

        return res.status(200).json({
            Result : true,
            Message : 'Read SuccessFully!',
            data : readInfo
        });
    
    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });
    
    }
};

const updateInfo = async (req , res) => {
    try {
        
        const Id = req.params.id;
        const { streetName , areaName , cityName , stateName , countryName , pincode , phoneNumber , profileEnable } = req.body;

        const updateInfo = {
            streetName : streetName,
            areaName : areaName,
            cityName : cityName,
            stateName : stateName,
            countryName : countryName,
            pincode : pincode,
            phoneNumber : phoneNumber,
            profileEnable : profileEnable
        };

        const updatedInfo = await contactTable.findOneAndUpdate({_id : Id} , updateInfo , {new:true});

        return res.status(200).json({
            Result : true,
            Message : 'Updated SuccessFully!',
            data : updatedInfo
        });
    
    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });
    
    }
};

const deleteInfo = async (req , res) => {
    try {
        
        const Id = req.params.id;

        const deletedInfo = await contactTable.findOneAndDelete({_id : Id});
        
        return res.status(200).json({
            Result : true,
            Message : 'Deleted SuccessFully!',
            data : deletedInfo
        });
    
    } catch (error) {
        
        return res.status(404).json({
            Result : false,
            Message : error.message
        });
    
    }
};

const readInfoInFront = async (req , res) => {
    try {
        
        const userId = process.env.USER_ID;

        const readInfo = await contactTable.find({userId : userId , profileEnable: true});

        return res.status(200).json({
            Result : true,
            Message : 'Read SuccessFully!',
            data : readInfo
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
    addInfo,
    readInfo,
    updateInfo,
    deleteInfo,
    readInfoInFront
}


