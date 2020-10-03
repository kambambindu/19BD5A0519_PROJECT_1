const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Hospital = require('../models/hospital');

router.use(bodyParser.json());

router.route('/')
.get((req, res) => {
    Hospital.find()
    .then(hosps => {
        res.statusCode = 200;
        res.json(hosps);
    }, err=> next(err))
    .catch(err => {
        return next(err);
    });
})
.post((req,res)=>{
    const hosp = {
        id :req.body.id,
        name : req.body.name,
        address : req.body.address,
        phno : req.body.phno,
    };
    Hospital.create(hosp)
    .then(hospital => {
        res.statusCode = 200;
        res.json(hospital);
    }, err=> next(err))
    .catch(err => {
        return next(err);
    })    
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /hospitals');
})
.delete((req, res) => {
    Hospital.deleteMany({})
    .then(resp => {
        res.statusCode = 200;
        res.json(resp);
    }, err => next(err))
    .catch(err => {
        return next(err);
    })
});


router.route("/:id")
.get((req, res) => {
    Hospital.findOne({ id: req.params.id })
    .then(hosp => {
        res.statusCode = 200;
        res.json(hosp);
    }, err=> next(err))
    .catch(err => {
        return next(err);
    })
})

.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /hospitals/' + req.params.id);
})

.put((req, res) => {
    Hospital.findOneAndUpdate({id: req.params.id},{
            $set: req.body
        }, { new: true })
    .then(resp => {
        res.statusCode = 200;
        res.json(resp);
    }, err => next(err))
    .catch(err => {
        return next(err);
    })
})

.delete((req, res) => {
    Hospital.findOneAndDelete({id: req.params.id})
    .then(resp => {
        res.statusCode = 200;
        res.json(resp);
    }, err => next(err))
    .catch(err => {
        return next(err);
    })
});


module.exports = router;
