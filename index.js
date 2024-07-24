const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://admin:1234@test.cx7f1zo.mongodb.net/?retryWrites=true&w=majority&appName=test')
const multer = require('multer');
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

app.use(express.json()) // use json
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//app.use(express.static(__dirname)); // legacy code in case of emergency

app.use(express.json());
app.use(fileUpload());


// Session middleware setup
app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(express.static(path.join(__dirname + "/public"))); 

const userRoutes = require('./controller/student');
app.use('/user', userRoutes);

const userRoutesLab = require('./controller/labtech');
app.use('/user', userRoutesLab);

/*  Importing of Routes From Controller Folder  */
const landingRoutes = require('./controller/landing')
const studentRoutes = require('./controller/student')
const labtechRoutes = require('./controller/labtech')

/*  Importing of Routes From Controller Folder  */
app.use('/', landingRoutes);
app.use('/', studentRoutes);
app.use('/', labtechRoutes);

/* Handlebars */
var hbs = require('hbs')
app.set('view engine','hbs');

var server = app.listen(3000, function() {
	console.log("listening to port 3000...");
});