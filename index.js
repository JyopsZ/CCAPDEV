var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(__dirname));

app.use(express.static(path.join(__dirname + "/public"))); 

/* ------------------------- Importing of Routes From Controller Folder --------------------------------- */
var landingRoutes = require('./controller/landing');
var studentRoutes = require('./controller/student');
var labtechRoutes = require('./controller/labtech');

app.use('/', landingRoutes);
app.use('/', studentRoutes);
app.use('/', labtechRoutes);



/*
app.get('/submit-student-data', function(req, res) {
	
	var name = req.query.firstName + " " + req.query.lastName;
	res.send (name + " obtained");
});

app.post('/submit-student-data', function(req, res) {
	
	var name = req.body.firstName + " " + req.body.lastName;
	res.send (name + " obtained");
});
*/

var server = app.listen(3000, function() {
	console.log("listening to port 3000...");
});