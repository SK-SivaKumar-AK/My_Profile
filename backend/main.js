/* call package */
const express = require('express');
const dotEnv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');



/* call package function */
const app = express();
dotEnv.config({
    path : path.join(__dirname , 'config' , '.env')
});



/* call inbuild middleware */
app.use(express.json());
app.use(express.urlencoded( { extended:true } ));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,  // Your frontend URL
    credentials: true,                // Allow cookies to be sent
  }));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'build')));



/* Call another files */
const { connectDatabase } = require('./config/database');
const { signinRouter } = require('./routes/signin.route');
const { dashboardRouter } = require('./routes/dashboard.route');
const { aboutRouter } = require('./routes/about.route');
const { projectRouter } = require('./routes/project.route');
const { experienceRouter } = require('./routes/experience.route');
const { testmonialRouter } = require('./routes/testmonial.route');
const { contactRouter } = require('./routes/contact.route');

app.get('/test', (req, res) => {
    res.send('This is the backend home route!!');
});
app.get(/^\/(aboutme|projects(?:\/[\w-]+)?|experience|testmonial|contactme)$/i, (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get(/^\/admin\/entry\/(login|register|)|\/admin\/entered\/(dashboard|aboutme|projects|experience|testmonial|contactme)$/i, (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


/* Call another files functions*/
connectDatabase();
app.use('/api/v1/' , signinRouter);
app.use('/api/v1/' , dashboardRouter);
app.use('/api/v1/' , aboutRouter);
app.use('/api/v1/' , projectRouter);
app.use('/api/v1/' , experienceRouter);
app.use('/api/v1/' , testmonialRouter);
app.use('/api/v1/' , contactRouter);



/* app listen */
app.listen(process.env.PORT , () => {
    console.log(`Server is Running on ${process.env.PORT} PORT in ${process.env.NODE_ENV} Environment.`);
}).on('error' , (error) => {
    console.log(error.message);
});


