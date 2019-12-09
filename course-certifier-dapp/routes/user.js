var express = require('express');
var blockchain = require('../controllers/blockchain-wrapper');
var router = express.Router();

/* GET student eligiblity for certification. */
router.get('/:id/eligible', function(req, res, next) {
  blockchain.waitForEvents();
  blockchain.getCheckEligibility(req.params.id, function(abi){
    blockchain.signTransaction(abi, function(status){
      res.sendStatus(status);
    });
  });
});

module.exports = router;
