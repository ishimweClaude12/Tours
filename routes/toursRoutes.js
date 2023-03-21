const express = require('express');
const {getAllTours, createTour, getTour,updateTour ,deleteTour, getToursStats} = require('../controllers/tourController')
const authController = require('./../controllers/authController');

const router = express.Router();





router
    .route('/')
    .get(authController.protect, getAllTours)
    .post(createTour);
router
    .route('/stats')
    .get(getToursStats)

router
    .route('/:id')
     .get(getTour)
     .patch(updateTour)
     .delete(authController.protect,authController.restrictTo('admin', 'lead-guide') , deleteTour);

module.exports = router;
