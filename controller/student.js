var express = require('express');
var router = express.Router();
var path = require('path');

//Student studentPage
router.get('/studentView/studentPage', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/studentView/studentPage.html"));
});

router.get('/studentView/view-availability', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/studentView/view-availability.html"));
});

router.get('/studentView/subReservation', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/studentView/subReservation.html"));
});

router.get('/studentView/subProfile', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/studentView/subProfile.html"));
});


//Student subReservation
router.get('/studentView/reservation', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/studentView/reservation.html"));
});

router.get('/studentView/view-list-reservations', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/studentView/view-list-reservations.html"));
});

router.get('/studentView/edit-reservation', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/studentView/edit-reservation.html"));
});


// Student reservation
router.get('/studentView/reserveslot', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/studentView/reserveslot.html"));
});


// Student reserveslot
router.get('/studentView/lab1', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/studentView/lab1.html"));
});

router.get('/studentView/lab2', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/studentView/lab2.html"));
});

router.get('/studentView/lab3', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/studentView/lab3.html"));
});


// Student subProfile
router.get('/studentView/ViewEditProfile', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/studentView/ViewEditProfile.html"));
});

router.get('/studentView/searchOtherProfile', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/studentView/searchOtherProfile.html"));
});

router.get('/studentView/DeleteProfile', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/studentView/DeleteProfile.html"));
});

// Student serchOtherProfile
router.get('/studentView/ViewOtherProfile', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/studentView/ViewOtherProfile.html"));
});

module.exports = router;