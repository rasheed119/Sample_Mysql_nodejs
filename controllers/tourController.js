const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
exports.checkId = (req, res, next, val) => {
    console.log(`tour id is${val}`);
    if (req.params.id * 1 > tours.length) {
        return res.status(404).json({
            status: "failed",
            message: "Invalid Id"
        });
    }
    next();
}
exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }
    //next middleware
    next();
}
exports.getTourWithId = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;

    const tour = tours.find(el => el.id === id);

    if (!tour) {
        return res.status(404).json({
            status: "failed",
            message: "Invalid Id"
        });
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
};
exports.createTour = (req, res) => {
    // console.log(req.body);
    const newId = tours[tours.length - 1].id + 1;
    const newTOur = Object.assign({
        id: newId
    },
        req.body
    );
    tours.push(newTOur);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',

            data: {
                tour: newTOur
            }
        });
    });
    // res.send('Done');
};
exports.updateTour = (req, res) => {


    res.status(200).json({
        status: 'success',
        data: {
            tour: 'Updated patch api'
        }
    });
};
exports.deleteTour = (req, res) => {


    res.status(204).json({
        status: 'success',
        data: null
    });
};

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};
