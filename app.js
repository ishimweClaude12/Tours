const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const toursRouter = require('./routes/toursRoutes')
const usersRouter = require('./routes/usersRoutes');
const grobalErrorHandler = require('./controllers/errorController');
const APPERROR = require('./utils/ErrorHandler');


const app = express();

//Middleware
app.use(morgan('combined'))
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/v1/tours', toursRouter)
app.use('/api/v1/users', usersRouter)
app.all('*', (req, res, next)=>{
    // res.status(404).json({
    //     status: 'Failed ', 
    //     message: `could not get ${req.originalUrl}`

    // });
    // const err = new Error ('Coud not get that Url');
    //   err.statusCode = 404;
    //   err.status = Error.message;


    next(new APPERROR('this route is not defined now', 402));
})


app.use(grobalErrorHandler);
module.exports = app;