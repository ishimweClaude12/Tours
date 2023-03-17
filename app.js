const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const toursRouter = require('./routes/toursRoutes')
const usersRouter = require('./routes/usersRoutes')



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
    const err = new Error ('Coud not get that Url');
      err.statusCode = 404;
      err.status = 'Failed';


    next(err);
})
// app.use((err, req, res, next)={
//     statusCode = err.statusCode || 500; 
//     status = err.status || 'error'
//     res.status(statusCode).json({
//       status: status, 
//       message: err
//     });
//   next();
 
// })

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'
  res.status(err.statusCode).json({
    status: err.status, 
    message: err
  })
})
module.exports = app;