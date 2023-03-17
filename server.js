const app = require('./app')
const mongoose = require('mongoose');

mongoose
.connect('mongodb://127.0.0.1:27017/TourDB')
.then(()=>{console.log('DB connected')});

app.listen(3004, function(){
    console.log('the server is running on port 3004');
})