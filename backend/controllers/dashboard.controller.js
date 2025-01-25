/* call package */



/* call package function */



/* Call another files */
const { dashboardTable } = require('../models/dashboard.model');



/* Call another files functions and original functions */
const addInfo = async (req , res) => {
    try {

        const userId = req.userId;
        const { mainContent , subContent , contentEnable } = req.body;
        const { image } = req.files;

        const addInfo = new dashboardTable({
            mainContent : mainContent,
            subContent : subContent,
            contentEnable : contentEnable,
            userImage : image[0].filename,
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

        const readInfo = await dashboardTable.find({userId : userId});

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
        const { mainContent , subContent , contentEnable } = req.body;

        const updateInfo = {
            mainContent : mainContent,
            subContent : subContent,
            contentEnable : contentEnable
        };
        if(req.files && req.files.image && req.files.image.length > 0){
            updateInfo.userImage = req.files.image[0].filename;
        }

        const updatedInfo = await dashboardTable.findOneAndUpdate({_id : Id} , updateInfo , {new:true});

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

        const deletedInfo = await dashboardTable.findOneAndDelete({_id : Id});
        
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


