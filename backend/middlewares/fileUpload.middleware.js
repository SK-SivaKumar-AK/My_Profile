/* call package */
const multer = require('multer');
const path = require('path');
const fs = require('fs');



/* call package function */
const storage = multer.diskStorage({
    destination : (req , file , cb) => {

        
        if (file.fieldname === 'image') {
            const imageUploadPath = path.join(__dirname , '..' , 'assets' , 'uploads' , 'images');
            if(!fs.existsSync(imageUploadPath)){
                fs.mkdirSync(imageUploadPath , { recursive : true });
            }
            cb(null, imageUploadPath);  // Store image in 'uploads/images' folder
        } else if (file.fieldname === 'resume') {
            const resumesUploadPath = path.join(__dirname , '..' , 'assets' , 'uploads' , 'resumes');
            if(!fs.existsSync(resumesUploadPath)){
                fs.mkdirSync(resumesUploadPath , { recursive : true });
            }
            cb(null, resumesUploadPath); // Store resume in 'uploads/resumes' folder
        } else {
            cb(new Error('Invalid file type'), false);
        }

    },
    filename : (req , file , cb) => {

        cb(null , `${Date.now()}-${file.originalname}`);

    }
});

const filefilter = (req , file , cb) => {

    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg' , ];
    const allowedPdfTypes = ['application/pdf'];

    if (file.fieldname === 'image' && allowedImageTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else if (file.fieldname === 'resume' && allowedPdfTypes.includes(file.mimetype)) {
        cb(null, true); 
    } 
    else {
        cb(new Error('Invalid File Format. Only JPEG, PNG images, and PDF files are allowed.'));
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
    },
    {
        name : 'resume',
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


