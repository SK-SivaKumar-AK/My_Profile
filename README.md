# My_Profile
This is my Portfolio


---------------------------------------------------------Backend details---------------------------------------------------------
steps-1 => APIs:
#1 Users SignUp/Login
#2 Dashboard
#3 About
#4 Projects
#5 Experience
#6 Testmonial
#7 ContactMe



steps-2 => Packages used:
#1 nodemon in development server    =>   npm install nodemon -D
#2 Express  =>    npm install express
#3 Mongoose =>   npm install mongoose
#4 Env file  =>  npm install dotenv
#5 JWT   =>  npm install jsonwebtoken
#6 bcrypt  => npm install bcryptjs
#7 cookieparser   =>  npm install cookie-parser



step-2.1 => main.js templates:
/* call package */
/* call package function */
/* call inbuild middleware */
/* Call another files */
/* Call another files functions*/
/* app listen */

Step-2.2 => another file templates:
/* call package */
/* call package function */
/* Call another files */
/* Call another files functions and original functions */
/* export functions */

Step-2.3 => controller template
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


steps-3 => config
#1 .env file create
    - port,env,dburl
#2 Database Connection
    - /* call package */
    - /* call package function */
    - /* Call another files */
    - /* Call another files functions and original functions */
    - /* export functions */
#3 main.js file work
    - /* call package */
    - /* call package function */
    - /* call inbuild middleware */
    - /* Call another files */
    - /* Call another files functions*/
    - /* app listen */


Step-4 => Create Routes
Step-5 => Create Controllers
Step-6 => Create middleware (If possible)
Step-7 => Create Models










