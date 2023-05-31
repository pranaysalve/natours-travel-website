const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const APIFeatures = require('./../utils/apiFeatures');

exports.deleteOne = (Model) => {
    
    return catchAsync(async (req, res, next) => {

        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });

    });

};

exports.updateOne = (Model) => { 
    
    return catchAsync(async (req, res, next) => {

        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });

    });

};

exports.createOne = (Model) => {

    return catchAsync(async (req, res, next) => {

        const doc = await Model.create(req.body);
    
        res.status(201).json({ //201 : created
            status: 'success',
            data: {
                data: doc
            }
        });
    
    });

};

exports.getOne = (Model, popOptions) => {

    return catchAsync(async (req, res, next) => {

        let query = Model.findById(req.params.id);

        if (popOptions) query = query.populate(popOptions);

        const doc = await query;
    
        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }
    
        res.status(200).json({
            status: 'success',
            data: {
                data: doc
            }
        });
    
    });

};

exports.getAll = (Model) => {

    return catchAsync(async (req, res, next) => {

        console.log('query', req.query);

        // To allow for nested GET reviews on tour (hack)
        let filter = {};
        if (req.params.tourId) filter = { tour: req.params.tourId };
    
        const features = new APIFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .limitFields()
            .pagination();
    
        const doc = await features.query;
        //const tours = await query;
        // query.sort().select().skip().limit();
    
        /* const query = Tour.find()
            .where('duration')
            .equals(5)
            .where('difficulty')
            .equals('easy'); */
    
        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: {
                data: doc
            }
        });
    
    });

};

