/* call package */
const express = require('express');



/* call package function */
const dashboardRouter = express.Router();



/* Call another files */
const { addInfo , readInfo , updateInfo , deleteInfo , readInfoInFront } = require('../controllers/dashboard.controller');
const { uploadImage } = require('../middlewares/fileUpload.middleware');
const { jwtAuthenticate } = require('../middlewares/jwtAuth.middleware');



/* Call another files functions and original functions */
dashboardRouter.route('/adddashboardinfo').post(jwtAuthenticate , uploadImage , addInfo);
dashboardRouter.route('/readdashboardinfo').get(jwtAuthenticate , readInfo);
dashboardRouter.route('/updatedashboardinfo/:id').post(jwtAuthenticate , uploadImage , updateInfo);
dashboardRouter.route('/deletedashboardinfo/:id').delete(jwtAuthenticate , deleteInfo);


dashboardRouter.route('/readdashboardinfofront/:Id').get(readInfoInFront);



/* export functions */
module.exports = {
    dashboardRouter
}


