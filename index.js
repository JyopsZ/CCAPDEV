const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/')

const express = require('express')
const bodyParser = require('body-parser')
const session = require("express-session")
const path = require('path')

// File Uploading
const fileUpload = require('express-fileupload')

const app = new express();

/* Initialize database collections */
const Reservation = require("./model/reservation")
const Profile = require("./model/profile")
const User = require("./model/user")

/*  Importing of Routes From Controller Folder  */
const landingRoutes = require('./controller/landing')
const studentRoutes = require('./controller/student')
const labtechRoutes = require('./controller/labtech')

app.use(express.json()) // use json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(express.static(__dirname)); // legacy code in case of emergency

app.use(express.json());
app.use(fileUpload());

app.use(express.static(path.join(__dirname + "/public"))); 

// Session middleware setup
app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
    })
);

/*  Importing of Routes From Controller Folder  */
app.use('/', landingRoutes);
app.use('/', studentRoutes);
app.use('/', labtechRoutes);

/* Handlebars */
var hbs = require('hbs')
app.set('view engine','hbs');


/* for searching and getting the data of the searched user */
/*
app.post("/findUserLab2", async (req, res) => {
    const { userName } = req.body;
    const lowerCaseUserName = userName.toLowerCase();
    
    try {
        const users = await User.find(); // Retrieve all users from the database
        const foundUser = users.find(user => 
            `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}` === lowerCaseUserName ||
            user.firstName.toLowerCase() === lowerCaseUserName ||
            user.lastName.toLowerCase() === lowerCaseUserName
        );
        if (foundUser) {
            req.session.searchedUser = foundUser;  // Store found user in session
            res.redirect("/LViewEditProfile");
        } else {
            res.send("User not found. <a href='/searchEditProfile'>Try again.</a>");
        }
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to render the profile view using session data
app.get("/LViewEditProfile", (req, res) => {
    const currUserLab = req.session.searchedUser;
    if (currUserLab) {
        res.render('LViewEditProfile', { userData: currUserLab });
    } else {
        res.send("No user selected. <a href='/searchEditProfile'>Search again.</a>");
    }
});
*/

var server = app.listen(3000, function() {
	console.log("listening to port 3000...");
});