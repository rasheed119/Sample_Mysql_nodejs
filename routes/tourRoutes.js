const express = require('express');
const tourRouter = express.Router();
const tourController = require('../controllers/tourController');
tourRouter.param('id', tourController.checkId);
tourRouter.route('/').
    get(tourController.getAllTours).
    post(tourController.checkBody, tourController.createTour);


tourRouter.route('/:id').
    get(tourController.getTourWithId).
    patch(tourController.updateTour).
    delete(tourController.deleteTour);

module.exports = tourRouter;