var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

/*
#{funding_account}
#{brand}
#{sub_brand}
#{discount}
#{acc_mgr_status}
#{mo_status}
*/
