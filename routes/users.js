var express = require('express');
var csrf    = require('csurf');
var config  = require('../config.js');
var router = express.Router();

var MUser = require('../models/munuser.js');

router.use(csrf());

// TOKEN CHECK
router.use(function(err, req, res, next) {
    if(err.code !== 'EBADCSRFTOKEN') return next();
    res.status(403);
    res.send("Trying to Perform A Request without valid CSRF Token!!");
});

// SESSION MANAGEMENT
router.use(function(req, res, next) {
   if(req.session && req.session.user) {
       MUser.findOne({userName: req.session.user.userName}, function(err, user) {
           if (user) {
               req.user = user;
               delete req.user.password;
               req.session.user = req.user;
               res.locals.user = req.user;         
           }
           next();
       });
   } else {
       next();
   }
});

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