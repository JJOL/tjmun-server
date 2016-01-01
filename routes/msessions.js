var express = require('express');
var config  = require('../config.js');
var router = express.Router();
//var mongoose = require('mongoose');
var MUNSession = require('../models/munsession.js');
/*
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//mongoose.connect('mongodb://localhost:27017/tjmundb');
var MUNSession = mongoose.model('session', new Schema({
        id: ObjectId,
        protocol: String,
        committeeName: String,
        delegates: Array,
        state: String,
        active: Boolean
    })
);*/

function apiAuth (req, res, next){
    if (req.body.auth_key && req.body.auth_key === config.API_KEY) {
        console.log("Good Auth");
        next();
    } else {
        console.log("Error Auth!");
        res.json({status: 505, error: 'No Autherization Provided'});
    }
}

// Get All Sessions
router.get("/", function(req, res) {
    MUNSession.find({}, {__v: 0}, function(err, munSessions) {
        if (!err) {
            res.json({ status: 1, data: munSessions });
        } else {
            res.json({ status: 0, msg: "Database Didn't Respond With Objects", error: err });
        }
    });
});

// Get Basic Information from Session
router.get("/:sessionid/info", function(req, res) {
    var id = req.params.sessionid;
    MUNSession.find({_id: id}, {__v: 0}, function(err, munSession) {        
        if(!err) {
            cleanDBObject(munSession);
            res.json({status: 1, data: munSession});    
        } else {
            res.json({status: 0, msg: "Didn't find a session matching id!", error: err})
        }
    }); 
    //res.json({msg: "Session("+ req.params.sessionid +") Info Done"});
});

// Create New Session
router.post("/open", apiAuth, function(req, res) {
    var munSession = new MUNSession({
        protocol: req.body.protocol,
        committeeName: req.body.name,
        state: req.body.state,
        delegates: [],
        active: false
    });
    munSession.save(function(err, ms) {
        if(!err) {
            console.log("Session Created Successfuly")
            res.json({status: 1, msg: "Successfully Created Session", data: ms});
        } else {
            console.log("Error: ", err);
            res.json({status: 0, msg: "Creation of DB was unsuccessful", error: err});           
        }
    })
    
});

router.put('/:sessid/info', apiAuth, function(req, res) {
    
});

// Delete Session
router.delete("/:sessid", apiAuth, function(req, res) {
    var id = req.params.sessid;
    MUNSession.remove({_id: id}, function(err) {
        if(!err) {
            res.json({status: 1, msg: "Session Deleted!!"});
        } else {
            res.json({status: 0, msg: "Session couldn't be removed", error: err});
        } 
    });
});

// Get Chronological Events of Session
router.get("/:sessionid/events", function(req, res) {
    res.json({msg: "Chronological Session Done"});
});


router.get("/:sessionid/warnings", function(req, res) {
    res.json({msg: "Warnings from Session Done"});
});

function cleanDBObject(object) {
    delete object['__v'];
    //console.log("Cleaning Object!", object);
    //return object;
}

module.exports = router;
