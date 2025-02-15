/* call package */



/* call package function */



/* Call another files */
const { projectTable } = require('../models/project.model');



/* Call another files functions and original functions */
const addInfo = async (req , res) => {
    try {
        
        const userId = req.userId;
        const { projectName , projectDescription , projectEnable } = req.body;
        const { image } = req.files;

        const addInfo = new projectTable({
            projectName : projectName,
            projectDescription : projectDescription,
            projectEnable : projectEnable,
            projectImage : image[0].filename,
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

        const readInfo = await projectTable.find({userId : userId});

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
        const { projectName , projectDescription , projectEnable } = req.body;

        const updateInfo = {
            projectName : projectName,
            projectDescription : projectDescription,
            projectEnable : projectEnable
        };
        if(req.files && req.files.image && req.files.image.length > 0){
            updateInfo.projectImage = req.files.image[0].filename;
        }

        const updatedInfo = await projectTable.findOneAndUpdate({_id : Id} , updateInfo , {new:true});

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

        const deletedInfo = await projectTable.findOneAndDelete({_id : Id});
        
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
        
        const userId = req.params.Id;

        const readInfo = await projectTable.find({userId : userId , projectEnable: true});

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

const readSingleInfoInFront = async (req , res) => {
    try {
        
        const Id = req.params.id;

        const readInfo = await projectTable.find({_id : Id , projectEnable: true});

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
    readInfoInFront,
    readSingleInfoInFront
}