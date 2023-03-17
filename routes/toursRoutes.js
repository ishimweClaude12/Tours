const express = require('express');
const {getAllTours, createTour, getTour,updateTour ,deleteTour, getToursStats} = require('../controllers/tourController')

const router = express.Router();





router
    .route('/')
    .get(getAllTours)
    .post(createTour);
router
    .route('/stats')
    .get(getToursStats)

router
    .route('/:id')
     .get(getTour)
     .patch(updateTour)
     .delete(deleteTour);

module.exports = router;
