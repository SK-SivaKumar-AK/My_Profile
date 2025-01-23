/* call package */
const express = require('express');



/* call package function */
const signinRouter = express.Router();



/* Call another files */
const { userSignin , userData , userInfoUpdate , userimageupdate , userLogin , userLogout } = require('../controllers/signin.controller');
const { uploadImage , noUploadImage } = require('../middlewares/fileUpload.middleware');
const { jwtAuthenticate } = require('../middlewares/jwtAuth.middleware');



/* Call another files functions and original functions */
signinRouter.route('/signin').post(uploadImage , userSignin);
signinRouter.route('/login').post(noUploadImage , userLogin);

signinRouter.route('/getuser').get(jwtAuthenticate , userData);
signinRouter.route('/userinfoupdate/:id').post(jwtAuthenticate , noUploadImage , userInfoUpdate);
signinRouter.route('/userimageupdate/:id').post(jwtAuthenticate , uploadImage , userimageupdate);

signinRouter.route('/logout').get(userLogout);



/* export functions */
module.exports = {
    signinRouter
}


