/* call package */
const express = require('express');



/* call package function */
const aboutRouter = express.Router();



/* Call another files */
const { addInfo , readInfo , updateInfo , updateImage , deleteInfo } = require('../controllers/about.controller');
const { uploadImage } = require('../middlewares/fileUpload.middleware');
const { jwtAuthenticate } = require('../middlewares/jwtAuth.middleware');



/* Call another files functions and original functions */
aboutRouter.route('/addaboutinfo').post(jwtAuthenticate , uploadImage , addInfo);
aboutRouter.route('/readaboutinfo').get(jwtAuthenticate , readInfo);
aboutRouter.route('/updateaboutinfo/:id').post(jwtAuthenticate , updateInfo);
aboutRouter.route('/updateaboutimage/:id').post(jwtAuthenticate , uploadImage , updateImage);
aboutRouter.route('/deleteaboutinfo/:id').delete(jwtAuthenticate , deleteInfo);



/* export functions */
module.exports = {
    aboutRouter
}


