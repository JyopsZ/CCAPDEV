var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname));

app.get('/index', function(req, res) {
	res.sendFile(__dirname + "\\" + "index.html");
});

app.get('/login', function(req, res) {
	res.sendFile(__dirname + "\\" + "login.html");
});

app.get('/register', function(req, res) {
	res.sendFile(__dirname + "\\" + "register.html");
});


//Student studentPage
app.get('/studentView/studentPage', function(req, res) {
	res.sendFile(__dirname + "\\" + "/studentView/studentPage.html");
});

app.get('/studentView/view-availability', function(req, res) {
	res.sendFile(__dirname + "\\" + "/studentView/view-availability.html");
});

app.get('/studentView/subReservation', function(req, res) {
	res.sendFile(__dirname + "\\" + "/studentView/subReservation.html");
});

app.get('/studentView/subProfile', function(req, res) {
	res.sendFile(__dirname + "\\" + "/studentView/subProfile.html");
});


//Student subReservation
app.get('/studentView/reservation', function(req, res) {
	res.sendFile(__dirname + "\\" + "/studentView/reservation.html");
});

app.get('/studentView/view-list-reservations', function(req, res) {
	res.sendFile(__dirname + "\\" + "/studentView/view-list-reservations.html");
});

app.get('/studentView/edit-reservation', function(req, res) {
	res.sendFile(__dirname + "\\" + "/studentView/edit-reservation.html");
});


// Student reservation
app.get('/studentView/reserveslot', function(req, res) {
	res.sendFile(__dirname + "\\" + "/studentView/reserveslot.html");
});


// Student reserveslot
app.get('/studentView/lab1', function(req, res) {
	res.sendFile(__dirname + "\\" + "/studentView/lab1.html");
});

app.get('/studentView/lab2', function(req, res) {
	res.sendFile(__dirname + "\\" + "/studentView/lab2.html");
});

app.get('/studentView/lab3', function(req, res) {
	res.sendFile(__dirname + "\\" + "/studentView/lab3.html");
});


// Student subProfile
app.get('/studentView/ViewEditProfile', function(req, res) {
	res.sendFile(__dirname + "\\" + "/studentView/ViewEditProfile.html");
});

app.get('/studentView/searchOtherProfile', function(req, res) {
	res.sendFile(__dirname + "\\" + "/studentView/searchOtherProfile.html");
});

app.get('/studentView/DeleteProfile', function(req, res) {
	res.sendFile(__dirname + "\\" + "/studentView/DeleteProfile.html");
});

// Student serchOtherProfile
app.get('/studentView/ViewOtherProfile', function(req, res) {
	res.sendFile(__dirname + "\\" + "/studentView/ViewOtherProfile.html");
});


// Lab Technician Labs
app.get('/labtechView/labtechPage', function(req, res) {
	res.sendFile(__dirname + "\\" + "labtechPage.html");
});

// Student Labs
app.get('/studentView/studentPage', function(req, res) {
	res.sendFile(__dirname + "\\" + "studentPage.html");
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