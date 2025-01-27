/* call package */
const express = require('express');



/* call package function */
const contactRouter = express.Router();



/* Call another files */
const { addInfo , readInfo , updateInfo , deleteInfo , readInfoInFront } = require('../controllers/contact.controller');
const { jwtAuthenticate } = require('../middlewares/jwtAuth.middleware');
const { noUploadImage } = require('../middlewares/fileUpload.middleware');



/* Call another files functions and original functions */
contactRouter.route('/addcontactinfo').post(jwtAuthenticate , noUploadImage , addInfo);
contactRouter.route('/readcontactinfo').get(jwtAuthenticate , readInfo);
contactRouter.route('/updatecontactinfo/:id').post(jwtAuthenticate , noUploadImage , updateInfo);
contactRouter.route('/deletecontactinfo/:id').delete(jwtAuthenticate , deleteInfo);

contactRouter.route('/readcontactinfofront').get(readInfoInFront);



/* export functions */
module.exports = {
    contactRouter
}


