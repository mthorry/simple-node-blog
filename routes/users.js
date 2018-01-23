var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/userlist', function(req, res, next) {
  var db = req.db;
  var collection = db.get('nodeapp')
  collection.find({},{}, (e, docs) => {
  	res.json(docs);
  });
});

module.exports = router;

// db.nodeapp.insert({
// 	title: "Post 5", 
// 	author: "testuser1", 
// 	content: "Af meggings roof party, godard humblebrag pour-over raw denim marfa mlkshk next level disrupt single-origin coffee artisan knausgaard. Semiotics quinoa wolf, stumptown drinking vinegar waistcoat church-key mumblecore vexillologist photo booth raw denim biodiesel.", 
// 	comments: [
// 		{}
// 		]
// 	})

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

// db.nodeapp.findOneAndUpdate(
// 	{ '_id' : ObjectId("5a676ed46375c2f77347672c") }, 
// 	{ $push : { comments: { author: "Matt", content: "omfg rofl" } }})
