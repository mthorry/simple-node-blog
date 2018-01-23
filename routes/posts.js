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

// db.nodeapp.insert({ "username" : "testuser1", "email" : "testuser1@testdomain.com", "posts" : [] })

// db.nodeapp.insert({ "username" : "testuser1", "email" : "testuser2@testdomain.com", "posts" : [{"title" : "Google Maps API", "author" : "testuser1", "content" : "Tumblr pitchfork cornhole health goth retro. Iceland pitchfork bicycle rights bespoke marfa umami blue bottle cronut distillery banjo. Af meggings roof party, godard humblebrag pour-over raw denim marfa mlkshk next level disrupt single-origin coffee artisan knausgaard. Kitsch bespoke seitan offal +1 cold-pressed pitchfork migas freegan, adaptogen trust fund copper mug."}] })

// db.nodeapp.findOneAndUpdate(
// 	{"_id" : ObjectId( "5a62610069cd75e80f3784a0" )}, 
// 	{ $push: 
// 		{ "posts" : 
// 			{ "title" : "Post 2", "author" : "testuser1", "content" : "Tumblr pitchfork cornhole health goth retro. Iceland pitchfork bicycle rights bespoke marfa umami blue bottle cronut distillery banjo. Af meggings roof party, godard humblebrag pour-over raw denim marfa mlkshk next level disrupt single-origin coffee artisan knausgaard. Kitsch bespoke seitan offal +1 cold-pressed pitchfork migas freegan, adaptogen trust fund copper mug.", "comments" : [] 
// 			} 
// 		}
// 	}
// )