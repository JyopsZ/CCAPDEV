var express = require('express');
const session = require("express-session");
var router = express.Router();
var path = require('path');
const UserModel = require('../model/user');


// Middleware for checking if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Lab Tech main page
router.get('/labtechView/labtechPage', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/labtechView/labtechPage.html'));
});

router.get('/labtechView/LViewAvailability', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/labtechView/LViewAvailability.html'));
});

router.get('/labtechView/LSubReservation', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/labtechView/LSubReservation.html'));
});

router.get('/labtechView/LSubProfile', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/labtechView/LSubProfile.html'));
});

// Lab Tech viewAvailability
router.get('/labtechView/LReserveslot', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/labtechView/LReserveslot.html'));
});

// Lab Tech LSubReservation
router.get('/labtechView/LReservation', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/labtechView/LReservation.html'));
});

router.get('/labtechView/LEditReservation', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/labtechView/LEditReservation.html'));
});

router.get('/labtechView/LRemoveReservationlist', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/labtechView/LRemoveReservationlist.html'));
});

// Lab Tech LReservation
router.get('/labtechView/LRemoveReservationlist', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/labtechView/LRemoveReservationlist.html'));
});

router.get('/labtechView/lab1', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/labtechView/lab1.html'));
});

router.get('/labtechView/lab2', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/labtechView/lab2.html'));
});

router.get('/labtechView/lab3', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/labtechView/lab3.html'));
});


// Labtech Page
router.get("/labtechPage", (req, res) => {
  // Retrieve user data from the session
  const user = req.session.user;
  console.log(user);
  res.render('labtechPage',{user});
});


// Lab Tech LSubProfile
router.get('/labtechView/searchEditProfile', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/labtechView/searchEditProfile.html'));
});

router.get('/labtechView/LsearchOtherProfile', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/labtechView/LsearchOtherProfile.html'));
});

router.get('views/LsearchEditProfile', isAuthenticated, function(req, res) {
  res.sendFile(path.join(__dirname, '/../public/labtechView/LsearchEditProfile'));
});



// Handling of form data to database
router.post('/editInfoLabtech', isAuthenticated, async (req, res) => {
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

    // Save the updated user to the database
    await user.save();

    // Update the session data with the new user information
    req.session.user = user;

    res.redirect('/labtechView/LsearchEditProfile');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

//search for labtech
router.post("/findUserLabtech", async (req, res) => {
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

      res.render('.../views/LViewEditProfile', { userData: users });
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
