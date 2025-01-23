/* call package */
const multer = require('multer');
const path = require('path');
const fs = require('fs');



/* call package function */
const storage = multer.diskStorage({
    destination : (req , file , cb) => {

        const uploadPath = path.join(__dirname , '..' , 'assets' , 'uploads');
        if(!fs.existsSync(uploadPath)){
            fs.mkdirSync(uploadPath , { recursive : true });
        }
        cb(null , uploadPath);

    },
    filename : (req , file , cb) => {

        cb(null , `${Date.now()}-${file.originalname}`);

    }
});

const filefilter = (req , file , cb) => {

    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if(allowedTypes.includes(file.mimetype)){

        cb(null , true);

    }else{

        cb(new Error('Invalid File Format.'));

    }
};

const uploads = multer({
    storage : storage,
    fileFilter : filefilter,
    limits : {
        fieldSize : 5 * 1024 * 1024
    }
});

const uploadImage = uploads.fields([
    {
        name : 'image',
        maxCount : 1
    }
]);

const noUploadImage = uploads.none();




/* Call another files */



/* Call another files functions and original functions */



/* export functions */
module.exports = {
    uploadImage,
    noUploadImage
}


