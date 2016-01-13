var express = require('express');
var csrf    = require('csurf');
var config  = require('../config.js');
var router = express.Router();

var MUser = require('../models/munuser.js');

router.use(csrf());



router.post('/register', requireLogin, function(req, res) {
  res.json({status: "Success", msg: "Registration Done!"});
});

router.get('/:userid/info', function(req, res) {
    res.json({status: "Success", msg: "User (" + req.params.userid + ") Found!"});
});

router.delete('/unregister/:userid', requireLogin, function(req, res) {
    res.json({status: "Success", msg: "User (" + req.params.userid + ") Deleted!"});
});

router.put('/modify/:userid', requireLogin, function(req, res) {
    res.json({status: "Success", msg: "User (" + req.params.userid + ") Modified!"});
});

function requireLogin(req, res, next) {
    if (req.user) {
        // Requet Has A valid Session To Make Changes
        next();
    } else {
        // Request Doesn't have a Valid Login!!!
        
    }
}


module.exports = router;