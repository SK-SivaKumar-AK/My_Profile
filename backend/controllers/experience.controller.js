/* call package */



/* call package function */



/* Call another files */
const { experienceTable } = require('../models/experience.model');



/* Call another files functions and original functions */
const addInfo = async (req , res) => {
    try {
        
        const userId = req.userId;
        const { roleName , roleDescription , year , companyName , companyLocation , experienceEnable } = req.body;

        const addInfo = new experienceTable({
            roleName : roleName,
            roleDescription : roleDescription,
            year : year,
            companyName : companyName,
            companyLocation : companyLocation,
            experienceEnable : experienceEnable,
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

        const readInfo = await experienceTable.find({userId : userId});

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
        const { roleName , roleDescription , year , companyName , companyLocation , experienceEnable } = req.body;

        const updateInfo = {
            roleName : roleName,
            roleDescription : roleDescription,
            year : year,
            companyName : companyName,
            companyLocation : companyLocation,
            experienceEnable : experienceEnable
        };

        const updatedInfo = await experienceTable.findOneAndUpdate({_id : Id} , updateInfo , {new:true});

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

        const deletedInfo = await experienceTable.findOneAndDelete({_id : Id});
        
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



/* export functions */
module.exports = {
    addInfo,
    readInfo,
    updateInfo,
    deleteInfo
}