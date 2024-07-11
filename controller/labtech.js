var express = require('express');
const session = require("express-session");
var router = express.Router();
var path = require('path');
const UserModel = require('../model/user');

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
router.get('/labtechView/LsearchEditProfile', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/LsearchEditProfile.html"));
});

router.get('/labtechView/LViewOtherProfile', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/labtechView/LViewOtherProfile.html"));
});


// Labtech Page
router.get("/labtechPage", (req, res) => {
    // Retrieve user data from the session
    const user = req.session.user;
    console.log(user);
    res.render('labtechPage',{user});
});

router.get('/LViewEditProfile' , async (req, res) => {
	const userId = req.session.user.userID;
    const userData = await UserModel.find({ userID:userId }) // select * from Post where userID == userData.userID
    console.log(userData)
    res.render('LViewEditProfile',{userData})
});

// Handling of form data to database
router.post('/editInfolabtech', async (req, res) => {
    try {
        const { id, firstName, lastName, password } = req.body;

        // Find the user by userID
        const userId = id;
        const user = await UserModel.findOne({ userID: userId });

        // Update the user's information
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = password;

        // Save the updated user to the database
        await user.save();

        res.redirect('/labtechPage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to handle the image upload form submission
router.post('/editImgLabtech', async (req, res) => {
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
        res.redirect('/labtechPage');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

/* --------------------- EDIT USERS for labtechs ------------------------ */
router.post("/findUser2", async (req, res) => {
    try {
        const { userName } = req.body;
        const lowerCaseName = userName.toLowerCase();

        const names = lowerCaseName.trim().split(' ');

        if (names.length !== 2) {
            return res.status(404).redirect('/labtechView/searchEditProfile?error=Please Enter First & Last Name.');
        }

        const filter = {
            $or: [
                { firstName: new RegExp(names[0], 'i'), lastName: new RegExp(names[1], 'i') },
                { firstName: new RegExp(names[1], 'i'), lastName: new RegExp(names[0], 'i') }
            ]
        };

        console.log("Search filter:", filter);

        const users = await UserModel.find(filter);

        console.log("Found users:", users);

        if (users.length === 0) {
            
            return res.status(404).redirect('/labtechView/searchEditProfile?error=User not found.');
        }

        res.render('LViewEditProfile', { userData: users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

/* --------------------- SEARCH USERS for labtechs ------------------------ */
router.post("/viewUserLab", async (req, res) => {

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

        res.render('LViewOtherProfile', { userData: users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }

});

module.exports = router;