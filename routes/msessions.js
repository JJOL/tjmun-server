var express = require('express');

var config  = require('../config.js');
var router = express.Router();
var MUNSession = require('../models/munsession.js');

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
    var basicInfoMask = {
        _id: 1, committeeName: 1, protocol: 1, moderators: 1
    };
    MUNSession.find({_id: id}, basicInfoMask, function(err, munSession) {        
        if(!err) {
            cleanDBObject(munSession);
            res.json({status: 1, data: munSession});    
        } else {
            res.json({status: 0, msg: "Didn't find a session matching id!", error: err})
        }
    }); 
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
    // Warnings
    // Clocks State Changes
    // Session State Changes
    
    // Get All Warnigns, Clock State Changes and Session State Changes
    // Make a map with Time Being Key and 
    
    /*var event = {
        time,
        type,
        message,
        data
    }*/
    
    var eventsMask = {
      _id: 1, events: 1  
    };
    
    MUNSession.find({_id: req.params.sessionid}, eventsMask, function(err, events) {
        if(!err) {
            res.json({status: 1, data: events})
        } else {
            res.json({status: 0, error: err, code: 50});
        }
    });
});


router.get("/:sessionid/warnings", function(req, res) {
    // Check If Input Request is Valid
    // Go Through All The Warnigs Found In DB
    
    var warningsMask = {
      _id: 1, warnings: 1
    };
    
    MUNSession.find({_id: req.params.sessionid}, warningsMask, function(err, sessWarns) {
        if(!err) {
            res.json({status: 1, data: sessWarns[0]});
        } else {
            res.json({status: 0, error: err, code: 50});
        }
    });
    
});

router.post("/:sessionid/warnings", apiAuth, function(req, res) {
    
    var fdate = ""; // Get and Transform the date in the correct way
    
    var newWarning = {
        to: req.body.to,
        date: fdate,
        comment: req.body.comment
    };
    
    // Add A Warnings Comment to the desired Session
    MUNSession.put({_id: req.params.sessionid}, {$push: {warnings: newWarning}}, function(err, raw) {
        if (!err) {
            res.json({status: 1})
        } else {
            
        }
    });
});

function cleanDBObject(object) {
    delete object['__v'];
    //console.log("Cleaning Object!", object);
    //return object;
}

module.exports = router;
