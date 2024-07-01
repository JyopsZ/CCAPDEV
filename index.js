var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname));

app.get('/', function(req, res) {
	res.sendFile(__dirname + "\\" + "index.html");
});

app.get('/login', function(req, res) {
	res.sendFile(__dirname + "\\" + "login.html");
});

app.get('/register', function(req, res) {
	res.sendFile(__dirname + "\\" + "register.html");
});

app.get('/studentView/studentPage', function(req, res) {
	res.sendFile(__dirname + "\\" + "studentPage.html");
});

app.get('/studentView/subReservation', function(req, res) {
	res.sendFile(__dirname + "\\" + "subReservation.html");
});

app.get('/studentView/subProfile', function(req, res) {
	res.sendFile(__dirname + "\\" + "subProfile.html");
});

/*
app.get('/submit-student-data', function(req, res) {
	
	var name = req.query.firstName + " " + req.query.lastName;
	res.send (name + " obtained");
});
*/

app.post('/submit-student-data', function(req, res) {
	
	var name = req.body.firstName + " " + req.body.lastName;
	res.send (name + " obtained");
});


var server = app.listen(5000, function() {
	console.log("listening to port 5000...");
});