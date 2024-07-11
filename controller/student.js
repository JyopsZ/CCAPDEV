var express = require('express');
const session = require("express-session");
var router = express.Router();
var path = require('path');
const UserModel = require('../model/user');


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

// Student Page
router.get("/studentPage", (req, res) => {
    // Retrieve user data from the session
    const user = req.session.user;
    console.log(user);
    res.render('studentPage',{user});
});


// Student subProfile
/*
router.get('/studentView/ViewEditProfile' , async (req, res) => {
	const userId = req.session.userID;
    const userData = await UserModel.find({userID:userId}) // select * from Post where userID == userData.userID
    console.log(userData)
    res.render('ViewEditProfile',{userData})
});
*/

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


// Student ViewEdit Handlebar
// Route for Handlebar
router.get('/ViewEditProfile' , async (req, res) => {
	const userId = req.session.user.userID;
    const userData = await UserModel.find({ userID:userId }) // select * from Post where userID == userData.userID
    console.log(userData)
    res.render('ViewEditProfile',{userData})
});

// Handling of form data to database
router.post('/editInfo', async (req, res) => {
    try {
        const { firstName, lastName, password } = req.body;

        // Find the user by userID
        const userId = req.session.user.userID;
        const user = await UserModel.findOne({ userID: userId });

        // Update the user's information
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = password;

        // Save the updated user to the database
        await user.save();

		// Update the session data with the new user information
        req.session.user = {
            userID: user.userID,
            firstName: user.firstName,
            lastName: user.lastName,
			password: user.password
        };

        res.redirect('/studentPage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to handle the image upload form submission
router.post('/editImg', async (req, res) => {
    try {

        // Get the uploaded file
        const uploadedFile = req.files.imageUpload;

        // Get the original filename
        const filename = uploadedFile.name;

        // Find the user by userID
        const userId = req.session.user.userID;
        const user = await UserModel.findOne({ userID: userId });

        // Save the uploaded file to the ../public/images folder
        const uploadPath = path.join(__dirname, 'public/images', filename);
        await uploadedFile.mv(uploadPath);

        // Update the user's image property with the original filename
        user.image = filename;

        // Save the updated user to the database
        await user.save();

		req.session.user = {
			
			image: user.image
		}

        // Redirect or send a response
        res.redirect('/studentPage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

/* --------------------- SEARCH USERS for students ------------------------ */
router.post("/findUser", async (req, res) => {
    try {
        const { userName } = req.body;
        const lowerCaseName = userName.toLowerCase();

        let filter = {};

        const names = lowerCaseName.trim().split(' ');
        
        if (names.length === 2) {
            filter = {
                $or: [
                    { firstName: new RegExp(names[0], 'i'), lastName: new RegExp(names[1], 'i') },
                    { firstName: new RegExp(names[1], 'i'), lastName: new RegExp(names[0], 'i') }
                ]
            };
        } else if (names.length === 1) {
            filter = {
                $or: [
                    { firstName: new RegExp(names[0], 'i') },
                    { lastName: new RegExp(names[0], 'i') }
                ]
            };
        }

        console.log("Search filter:", filter);

        const users = await UserModel.find(filter);

        console.log("Found users:", users);

        res.render('searchOtherProfile', { userData: users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Student Reservation
router.get('/reservation', function(req, res) {
    const user = req.session.user;
    res.render('reservation', {
        firstName: user.firstName,
        lastName: user.lastName
    });
});

module.exports = router;