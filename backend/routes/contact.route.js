/* call package */
const express = require('express');



/* call package function */
const contactRouter = express.Router();



/* Call another files */
const { addInfo , readInfo , updateInfo , deleteInfo } = require('../controllers/contact.controller');
const { jwtAuthenticate } = require('../middlewares/jwtAuth.middleware');



/* Call another files functions and original functions */
contactRouter.route('/addcontactinfo').post(jwtAuthenticate , addInfo);
contactRouter.route('/readcontactinfo').get(jwtAuthenticate , readInfo);
contactRouter.route('/updatecontactinfo/:id').post(jwtAuthenticate , updateInfo);
contactRouter.route('/deletecontactinfo/:id').delete(jwtAuthenticate , deleteInfo);



/* export functions */
module.exports = {
    contactRouter
}


