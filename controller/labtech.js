var express = require('express');
var router = express.Router();
var path = require('path');

/**************************************** LAB TECHNICIAN ********************************************/

// Lab Tech main page
router.get('/labtechView/labtechPage', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/labtechPage.html"));
});

router.get('/labtechView/LViewAvailability', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/LViewAvailability.html"));
});

router.get('/labtechView/LSubReservation', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/LSubReservation.html"));
});

router.get('/labtechView/LSubProfile', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/LSubProfile.html"));
});


// Lab Tech viewAvailability
router.get('/labtechView/LReserveslot', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/LReserveslot.html"));
});


// Lab Tech LSubReservation
router.get('/labtechView/LReservation', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/LReservation.html"));
});

router.get('/labtechView/LEditReservation', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/LEditReservation.html"));
});

router.get('/labtechView/LRemoveReservationlist', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/LRemoveReservationlist.html"));
});


// Lab Tech LReservation
router.get('/labtechView/LRemoveReservationlist', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/LRemoveReservationlist.html"));
});

router.get('/labtechView/lab1', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/lab1.html"));
});

router.get('/labtechView/lab2', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/lab2.html"));
});

router.get('/labtechView/lab3', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/lab3.html"));
});


// Lab Tech LSubProfile
router.get('/labtechView/searchEditProfile', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/searchEditProfile.html"));
});

router.get('/labtechView/LsearchOtherProfile', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/LsearchOtherProfile.html"));
});


// Lab Tech LViewEditProfile
router.get('/labtechView/LViewEditProfile', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/LViewEditProfile.html"));
});

router.get('/labtechView/LViewOtherProfile', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/LViewOtherProfile.html"));
});

module.exports = router;