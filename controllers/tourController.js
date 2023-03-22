const Tour = require('../model/tourModel');
const APIFeatures = require('./../utils/APIFeatures')

const getAllTours =  async (req, res)=>{
    try{
       

const features = new APIFeatures(Tour.find(), req.query)
                                                    .filter()
                                                    .sort()
                                                    .limit()
                                                    .paginate();


        const Tours = await features.query;
        res.status(201).json({
            status: 'Success', 
            results: Tours.length, 
            data:{
                Tours
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
             
            Message : {
            Error: 'could not find your req' + err
            }
        });
    }
   
}
const createTour = async (req, res)=>{
  
    try {
        const newTour = await Tour.create(req.body)
        
        res.status(201).json({
            status: 'Success', 
            data: {
                newTour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'failed', 
            message: err
        })
    }
   
}
const getTour = async(req, res)=>{
    try {
        const tour =  await Tour.findById(req.params.id)
        res.status(200).json({
            status: 'Success', 
            data: {
                tour
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed', 
            message: error
        })
    }
}
const updateTour = async(req, res)=>{
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators: true

        })
        res.status(201).json({
            status: 'Success', 
            data: {
                tour
            }
        })

    } catch (error) {
        res.status(400).json({
            status: 'failed', 
            message: error
        })
    }
}
const deleteTour = async(req, res)=>{
    try {
        await Tour.findByIdAndDelete(req.params.id)

     return   res.status(204).json({
            status: 'Successful', 
            message: 'Deleted This Object'
        })
    } catch (error) {
    return    res.status(400).json({
            status: 'failed', 
            message: error
        })
    }
}
const getToursStats = async (req, res)=>{

    try {
        const stats = await Tour.aggregate([
            {
            $match: {ratingsAverage: {$gte: 4.5}}
        }, 
            {
                $group: {
                     _id: {$toUpper: 'difficulty'}, 
                    numTours: {$sum: 1}, 
                    numRatings: {$sum: '$ratingsQuantity'}, 
                    avgRating: { $avg: '$ratingsAverage'}, 
                    avgPrice: { $avg: '$price'}, 
                    minPrice: { $min: '$price'}, 
                    maxPrice: { $max: '$price'}, 

                }
            },
            {
                $sort: { avgPrice: 1}
            }
        
    ])
 return   res.status(201).json({
        status: 'Successful', 
        data: {
            stats
        }
    })
    } catch (error) {
    return    res.status(400).json({
            status: 'failed', 
            err: 'couldn ',
            message: error
        })
    }
}

// module.exports = {getTour, getAllTours, createTour , updateTour}
module.exports = {getAllTours, createTour , getTour , updateTour, deleteTour, getToursStats};