var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var collection = db.get('nodeapp')
  collection.find({},{}, (e, docs) => {
  	res.json(docs);
  });
});

module.exports = router;
