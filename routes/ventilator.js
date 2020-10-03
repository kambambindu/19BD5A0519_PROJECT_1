const express = require('express');
const router = express.Router();
const Ventilator = require('../models/ventilator');
const url = 

router.route('/')
.get((req, res) => {
    Ventilator.find()
    .then(ventilators => {
        res.statusCode = 200;
        res.json(ventilators);
    }, err=> next(err))
    .catch(err => {
        return next(err);
    });
})
.post((req,res)=>{
    const ven = {
        id :req.body.id,
        venId : req.body.venId,
        nameHos : req.body.nameHos,
        status : req.body.status,
    };
    Ventilator.create(ven)
    .then(vent => {
        res.statusCode = 200;
        res.json(vent);
    }, err=> next(err))
    .catch(err => {
        return next(err);
    });
});

router.route("/:venId")
.get((req, res) => {
    Ventilator.findOne({venId: req.params.venId})
    .then(ventilators => {
        res.statusCode = 200;
        res.json(ventilators);
    }, err=> next(err))
    .catch(err => {
        return next(err);
    });
})
.post((req, res) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /ventilators/' + req.params.venId);
})
.put((req, res)=>
{
    Ventilator.findOneAndUpdate({venid: req.params.venid},{
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
    Ventilator.findOneAndDelete({id: req.params.id})
    .then(resp => {
        res.statusCode = 200;
        res.json(resp);
    }, err => next(err))
    .catch(err => {
        return next(err);
    })
});

router.route("/status/:status")
.get((req, res) => {
    Ventilator.find({status: req.params.status})
    .then(ventilators => {
        res.statusCode = 200;
        res.json(ventilators);
    }, err=> next(err))
    .catch(err => {
        return next(err);
    });
});

router.route("/ventilatorSearchByHospAndStatus")
.put((req, res) => {
    var s=req.body.status
    var name =req.body.name
    
    Ventilator.find({ status : s, nameHos : name })
        .then(ventilator => {
            res.statusCode = 200;
            res.json(ventilator);
        })
        .catch((err) => {
            res.send("Error at Retrieving from Hospitals Collection")
        });
});

module.exports = router;
