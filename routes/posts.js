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


/*
 * POST to addpost.
 */
router.post('/addpost', function(req, res) {
    var db = req.db;
    var collection = db.get('nodeapp');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


/*
 * PUT to addcomment.
 */
// router.put('/addcomment/:id', function(req, res) {
//     var db = req.db;
//     var collection = db.get('nodeapp');
//     var postToComment = { '_id' : req.params.id } ;
//     var commentBody = { $push : { comments: { req.body } }}
//     collection.findOneAndUpdate( postToComment,
//     	commentBody,
//     	function(err, result){
//         res.send(
//             (err === null) ? { msg: '' } : { msg: err }
//         );
//     });
// });


/*
 * DELETE to deletepost.
 */
router.delete('/deletepost/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('nodeapp');
    var postToDelete = req.params.id;
    collection.remove({ '_id' : postToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

module.exports = router;

