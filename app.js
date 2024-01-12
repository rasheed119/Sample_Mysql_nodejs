const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes.js');
const userRouter = require('./routes/userRouter.js');


const app = express();
//MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    console.log('Middleware called.....');
    next();
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//route
// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'Hello i m from server side',
//         app: 'Natours'
//     });
// });

// app.post('/', (req, res) => {
//     res.send('Post api method');
// });

// console.log(`${tours}`);

//api with url params
// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id/', getTourWithId);
// //post
// app.post('/api/v1/tours', createTour);
// //patch
// app.patch('/api/v1/tours/:id', updateTour);
// //delete
// app.delete('/api/v1/tours/:id', deleteTour);4

//Strat server
module.exports = app;