/* call package */
const express = require('express');



/* call package function */
const experienceRouter = express.Router();



/* Call another files */
const { addInfo , readInfo , updateInfo , deleteInfo } = require('../controllers/experience.controller');
const { jwtAuthenticate } = require('../middlewares/jwtAuth.middleware');



/* Call another files functions and original functions */
experienceRouter.route('/addexperienceinfo').post(jwtAuthenticate , addInfo);
experienceRouter.route('/readexperienceinfo').get(jwtAuthenticate , readInfo);
experienceRouter.route('/updateexperienceinfo/:id').post(jwtAuthenticate , updateInfo);
experienceRouter.route('/deleteexperienceinfo/:id').delete(jwtAuthenticate , deleteInfo);



/* export functions */
module.exports = {
    experienceRouter
}