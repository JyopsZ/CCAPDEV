var express = require('express');
const session = require("express-session");
var router = express.Router();
var path = require('path');
const UserModel = require('../model/user');
const ReservationModel = require('../model/reservation');

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

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update the user's information
        user.firstName = firstName;
        user.lastName = lastName;
        user.password = password;

        if (req.files && req.files.imageUpload) {
            const imageFile = req.files.imageUpload;
            const uploadPath = path.join(__dirname, '../public/images', `${Date.now()}-${imageFile.name}`);

            // Move the file to the desired location
            imageFile.mv(uploadPath, (err) => {
                if (err) {
                    console.error('Error uploading file:', err);
                    return res.status(500).send('Internal Server Error');
                }
            });

            user.image = path.basename(uploadPath); // Store the filename of the uploaded image
        }

        // Save the updated user to the database
        await user.save();

        // Update the session data with the new user information
        req.session.user = {
            userID: user.userID,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            image: user.image
        };

        res.redirect('/studentPage');
    } catch (err) {
        console.error('Error updating user information:', err);
        res.status(500).send('Internal Server Error');
    }
});

/*
// Route to handle the image upload form submission
router.post('/editImg', async (req, res) => {
    try {
        if (!req.files || !req.files.imageUpload) {
            return res.status(400).send('No files were uploaded.');
        }   
        else{
            // Get the uploaded file
            const uploadedFile = req.files.imageUpload;

            // Get the original filename
            const filename = uploadedFile.name;

            // Find the user by userID
            const userId = req.session.user.userID;
            const user = await UserModel.findOne({ userID: userId });

            // Save the uploaded file to the ../public/images folder
            const uploadPath = path.join(__dirname, '../public/images', filename);
            await uploadedFile.mv(uploadPath);

            // Update the user's image property with the original filename
            user.image = filename;

            // Save the updated user to the database
            await user.save();

            // Update session with the new image path
            req.session.user.image = user.image;

            // Redirect or send a response
            res.redirect('/studentPage');
        }
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});*/

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

/* --------------------- Student RESERVATION ------------------------ */
router.get('/reservation', function(req, res) {
    const user = req.session.user;
    res.render('reservation', {
        firstName: user.firstName,
        lastName: user.lastName
    });
});

// Route to fetch reservations
router.get('/reservations', async (req, res) => {
    const { labName, date, time } = req.query;
    try {
        const reservations = await ReservationModel.find({ labName, date, time });
        res.json(reservations);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching reservations');
    }
});

// Route to create a new reservation
router.post('/reservation', async (req, res) => {
    const { labName, seatRow, seatCol, date, time, reserver } = req.body;
    const seatPos = [parseInt(seatRow), parseInt(seatCol)];
    const reservationID = Math.floor(Math.random() * 10000); // Generate a random reservation ID

    try {
        // Check if the seat is already taken
        const existingReserve = await ReservationModel.findOne({ labName, date, time, seatPos });
        if (existingReserve) {
            res.status(500).redirect('/reservation');
        }

        const newReserve = new ReservationModel({
            labName,
            seatPos,
            date,
            time,
            reserver,
            reservationID
        });

        await newReserve.save();
        res.status(201).redirect('/studentView/subReservation');
    } catch (error) {
        console.error(error);
        res.status(500).redirect('/reservation');
    }
});

/* --------------------- Edit Reservation for Students ------------------------ */
router.get('/view-list-reservations', async (req, res) => {
    const getSessionUID = req.session.user.userID;
    const getUserID = await UserModel.findOne({ userID: getSessionUID });
    const firstName = getUserID.firstName;
    const lastName = getUserID.lastName;
    const fullName = `${firstName} ${lastName}`;
    const getReservations = await ReservationModel.find({ reserver: fullName });
    res.render('view-list-reservations', { getReservations });
});

router.get('/editReservation', async (req, res) => {
    res.render('editReservation');
});

router.post('/editReservation', async (req, res) => {
    const { reservId } = req.body;
    const specificReserve = await ReservationModel.findOne({ reservationID: reservId });
    console.log(specificReserve);
    res.render('LEditReservation', {specificReserve});
});

router.post('/updateReservation', async (req, res) => {
    const { reservationid, editlab, editdate } = req.body;
    
    // Check if there is an existing reservation with the same lab and date
    const existingReservation = await ReservationModel.findOne({ labName: editlab, date: editdate });
    
    if (existingReservation) {
        // If there is a clash, inform the user
        return res.render('LEditReservation', {specificReserve: await ReservationModel.findOne({ reservationID: reservationid }), error: 'The selected date and lab are already reserved.'});
    }
    
    // If no clash, proceed to update the reservation
    const specificReserve = await ReservationModel.findOneAndUpdate(
        { reservationID: reservationid },
        { labName: editlab, date: editdate }
    );

    console.log(specificReserve);
    res.render('LEditReservation', {specificReserve, success: 'Reservation updated successfully.'});
});


/* --------------------- Delete own Profile for Students ------------------------ */
router.post('/deleteUser', async (req, res) => {
    try {
        const userId = req.session.user.userID;
        await UserModel.deleteOne({ userID: userId });
        req.session.destroy();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

/* --------------------- Display User Profile from Tooltip Press ------------------------ */
router.post("/tooltip", async (req, res) => {
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

        res.render('tooltipViewUser', { userData: users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});


/* --------------------- Student Check Seat Availability ------------------------ */
router.get('/viewAvailable', function(req, res) {
    const user = req.session.user;
    res.render('viewAvailable');
});

// Route to fetch reservations
router.get('/viewSeats', async (req, res) => {
    const { labName, date, time } = req.query;
    try {
        const viewSeats = await ReservationModel.find({ labName, date, time });
        res.json(viewSeats);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching seats');
    }
});

module.exports = router;