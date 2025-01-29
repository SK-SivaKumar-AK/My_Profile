/* call package */
const express = require('express');



/* call package function */
const testmonialRouter = express.Router();



/* Call another files */
const { addInfo , readInfo , updateInfo , deleteInfo , readInfoInFront } = require('../controllers/testmonial.controller');
const { jwtAuthenticate } = require('../middlewares/jwtAuth.middleware');
const { noUploadImage } = require('../middlewares/fileUpload.middleware');


/* Call another files functions and original functions */
testmonialRouter.route('/addtestmonialinfo').post(jwtAuthenticate , noUploadImage , addInfo);
testmonialRouter.route('/readtestmonialinfo').get(jwtAuthenticate , readInfo);
testmonialRouter.route('/updatetestmonialinfo/:id').post(jwtAuthenticate , noUploadImage , updateInfo);
testmonialRouter.route('/deletetestmonialinfo/:id').delete(jwtAuthenticate , deleteInfo);

testmonialRouter.route('/readtestmonialinfofront/:Id').get(readInfoInFront);



/* export functions */
module.exports = {
    testmonialRouter
}