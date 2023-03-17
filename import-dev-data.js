const fs = require('fs');
const Tour = require('./model/tourModel')

const mongoose = require('mongoose');

//// read json file
// const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.simple.json`, 'utf-8'));
const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json', 'utf-8'));
// import data into the database

const importData = async ()=>{
    try {
        await Tour.create(tours);
        console.log('daata saved successfully');
    } catch (error) {
        console.log(error);
    }
}
const deleteData = async()=>{
    try {
        await Tour.deleteMany()
        console.log('Deleted All Data');
    } catch (error) {
        console.log(error);
    }
}
 if(process.argv[2] ==='--import'){
    importData();
    
 }else if(process.argv[2] ==='--delete'){
    deleteData();
 } else{
    console.log('some errors');
 }
mongoose
.connect('mongodb://127.0.0.1:27017/TourDB')
.then(()=>{console.log('DB connected')});