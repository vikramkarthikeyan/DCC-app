var express = require('express');
var courses = require('../courses.json')
var blockchain = require('../controllers/blockchain-wrapper');
var router = express.Router();

/* POST cs course listing. */
router.post('/cs', function (req, res, next) {
    if(courses.cse[req.body.courseNumber] != null) {
        var programCode = courses.cse[req.body.courseNumber];
        blockchain.getAddCSCourseABI(req.body.personNumber, programCode, req.body.courseGPA, function(abi){
            blockchain.signTransaction(abi, function(status){
                res.sendStatus(status);
            });
        });
    } else {
        res.sendStatus(302);
    }
});

/* POST other course listing. */
router.post('/other', function (req, res, next) {
    if(courses.other[req.body.courseNumber] != null) {
        var programCode = courses.other[req.body.courseNumber];
        blockchain.getAddNonCSCourseABI(req.body.personNumber, programCode, req.body.courseGPA, function(abi){
            blockchain.signTransaction(abi, function(status){
            res.sendStatus(status);
            });
        });
    } else {
        res.sendStatus(302);
    }
});

module.exports = router;
