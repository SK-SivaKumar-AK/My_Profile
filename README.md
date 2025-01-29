# My_Profile
This is my Portfolio


---------------------------------------------------------Backend details---------------------------------------------------------

Packages Installed:
#1 nodemon in development server    =>   npm install nodemon -D
#2 Express  =>    npm install express
#3 Mongoose =>   npm install mongoose
#4 Env file  =>  npm install dotenv
#5 JWT   =>  npm install jsonwebtoken
#6 bcrypt  => npm install bcryptjs
#7 cookieparser   =>  npm install cookie-parser
#8 CORS policies  => npm install cors
#7 Mail => npm install nodemailer

mongodb atlas connection:
username : sksivakumarak
password : BshvGiuYPqKBm7Ur
mongodb+srv://sksivakumarak:BshvGiuYPqKBm7Ur@myprofile.e5wg6.mongodb.net/?retryWrites=true&w=majority&appName=MyProfile




APIs:
#1 Users SignUp/Login
#2 Dashboard
#3 About
#4 Projects
#5 Experience
#6 Testmonial
#7 ContactMe





main.js templates:
/* call package */
/* call package function */
/* call inbuild middleware */
/* Call another files */
/* Call another files functions*/
/* app listen */

another file templates:
/* call package */
/* call package function */
/* Call another files */
/* Call another files functions and original functions */
/* export functions */

controller template:
try {
        
    return res.status(200).json({
        Result : true,
        Message : 'Added SuccessFully!',
        data : ''
    });

} catch (error) {
    
    return res.status(404).json({
        Result : false,
        Message : error.message
    });

}







Steps:
#1 Main file
    - express json and urlencode and cookie-parser etc
#2 Config
    - .env
    - database connection
#3 Middlewares
    -Middleware files
#4 Routes
    - Routes file
#5 Controllers
    - Controller files
#6 Models
    - Model files




=====================================================================================================================================




---------------------------------------------------------Frontend details---------------------------------------------------------


Packages Installed:
#1 npm install web-vitals
#2 npm install bootstrap
#3 npm install react-router-dom
#4 npm install react-toastify
#5 npm install bootstrap-icons


