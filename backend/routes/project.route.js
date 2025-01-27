/* call package */
const express = require('express');



/* call package function */
const projectRouter = express.Router();



/* Call another files */
const { addInfo , readInfo , updateInfo , deleteInfo , readInfoInFront } = require('../controllers/project.controller');
const { uploadImage } = require('../middlewares/fileUpload.middleware');
const { jwtAuthenticate } = require('../middlewares/jwtAuth.middleware');



/* Call another files functions and original functions */
projectRouter.route('/addprojectinfo').post(jwtAuthenticate , uploadImage , addInfo);
projectRouter.route('/readprojectinfo').get(jwtAuthenticate , readInfo);
projectRouter.route('/updateprojectinfo/:id').post(jwtAuthenticate , uploadImage , updateInfo);
projectRouter.route('/deleteprojectinfo/:id').delete(jwtAuthenticate , deleteInfo);

projectRouter.route('/readprojectinfofront').get(readInfoInFront);



/* export functions */
module.exports = {
    projectRouter
}


