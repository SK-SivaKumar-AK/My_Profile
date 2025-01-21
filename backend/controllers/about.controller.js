/* call package */



/* call package function */



/* Call another files */
const { aboutTable } = require('../models/about.model');



/* Call another files functions and original functions */
const addInfo = async (req , res) => {
    try {
        
        const userId = req.userId;
        const { skillName } = req.body;
        const { image } = req.files;

        const addInfo = new aboutTable({
            skillName : skillName,
            skillImage : image[0].filename,
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

        const readInfo = await aboutTable.find({userId : userId});

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
        const { skillName } = req.body;

        const updateInfo = {
            skillName : skillName
        };

        const updatedInfo = await aboutTable.findOneAndUpdate({_id : Id} , updateInfo , {new:true});

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

const updateImage = async (req , res) => {
    try {
        
        const Id = req.params.id;
        const { image } = req.files;

        const updateInfo = {
            skillImage : image[0].filename
        };

        const updatedInfo = await aboutTable.findOneAndUpdate( {_id : Id} , updateInfo , {new:true});

        return res.status(200).json({
            Result : true,
            Message : 'Added SuccessFully!',
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

        const deletedInfo = await aboutTable.findOneAndDelete({_id : Id});
        
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
    updateImage,
    deleteInfo
}


