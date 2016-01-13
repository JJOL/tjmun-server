var express = require('express');
var config  = require('../config.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', authKey: config.API_KEY, csrfToken: req.csrfToken()});
});

router.post('/login', function(req, res) {
    
});

module.exports = router;
