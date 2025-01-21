/* call package */
const express = require('express');



/* call package function */
const testmonialRouter = express.Router();



/* Call another files */
const { addInfo , readInfo , updateInfo , deleteInfo } = require('../controllers/testmonial.controller');
const { jwtAuthenticate } = require('../middlewares/jwtAuth.middleware');


/* Call another files functions and original functions */
testmonialRouter.route('/addtestmonialinfo').post(jwtAuthenticate , addInfo);
testmonialRouter.route('/readtestmonialinfo').get(jwtAuthenticate , readInfo);
testmonialRouter.route('/updatetestmonialinfo/:id').post(jwtAuthenticate , updateInfo);
testmonialRouter.route('/deletetestmonialinfo/:id').delete(jwtAuthenticate , deleteInfo);



/* export functions */
module.exports = {
    testmonialRouter
}