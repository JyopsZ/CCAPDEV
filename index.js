const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/')

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require("cookie-parser");


const fileUpload = require('express-fileupload') // File Uploading
const session = require("express-session") // Session

const app = new express();

/* Initialize database collections */
const Reservation = require("./model/reservation")
const Profile = require("./model/profile")


/*  Importing of Routes From Controller Folder  */
const landingRoutes = require('./controller/landing')
const studentRoutes = require('./controller/student')
const labtechRoutes = require('./controller/labtech')

app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(__dirname)); // legacy code in case of emergency

app.use(express.static(path.join(__dirname + "/public"))); 

/*  Importing of Routes From Controller Folder  */
app.use('/', landingRoutes);
app.use('/', studentRoutes);
app.use('/', labtechRoutes);

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());

/* Handlebars */
var hbs = require('hbs')
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

/***********End export *******************/


/* --------------------- Sessions --------------------- */
app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: false,
    })
);

/* --------------------- Hard Coded Profile Data --------------------- */
const user1 = {
    firstName: "Timmy",
    lastName: "Yap",
    email: "timmy_yap@dlsu.edu.ph",
    password: "student123",
    role: "student",
    image: "default.jpg",
    userID: "5001"
}; 

const user2 = {
    firstName: "Liam",
    lastName: "Anderson",
    email: "liam_anderson@dlsu.edu.ph",
    password: "student123",
    role: "student",
    image: "stock.jpg",
    userID: "5002"
}; 

const user3 = {
    firstName: "Brad",
    lastName: "Pitt",
    email: "brad_pitt@dlsu.edu.ph",
    password: "student123",
    role: "student",
    image: "brad.jpg",
    userID: "5003"
}; 

const user4 = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@dlsu.edu.ph",
    password: "lab123",
    role: "labtech",
    image: "john.jpg",
    userID: "1001"
}; 

const user5 = {
    firstName: "Sarah",
    lastName: "Gateway",
    email: "sarah.gateway@dlsu.edu.ph",
    password: "lab123",
    role: "labtech",
    image: "sarah.jpg",
    userID: "1002"
}; 

const user6 = {
    firstName: "Andrew",
    lastName: "Meda",
    email: "andrew.meda@dlsu.edu.ph",
    password: "lab123",
    role: "labtech",
    image: "andrew.jpg",
    userID: "1003"
}; 

const user7 = {
    firstName: "lebron",
    lastName: "Yap",
    email: "lebron@dlsu.edu.ph",
    password: "student123",
    role: "student",
    image: "default.jpg",
    userID: "5004"
}; 

/* ----- Variable declaretion for (users) search users----- */
const users = [user1, user2, user3, user4, user5, user6, user7];

/* --------------------- Hard Coded Reservation Data ------------------------ */
const reserve1 = {
    labName: "Alpha",
    seatPosition: [1, 1],
    date: "2024-06-24",
    time: "09:30",
    reserver: "5002",
    reserveID: "901"
};

const reserve2 = {
    labName: "Alpha",
    seatPosition: [1, 2],
    date: "2024-06-24",
    time: "09:30",
    reserver: "5002",
    reserveID: "902"
};

const reserve3 = {
    labName: "Bravo",
    seatPosition: [2, 2],
    date: "2024-07-06",
    time: "10:30",
    reserver: "5001",
    reserveID: "903"
};

const reserve4 = {
    labName: "Charlie",
    seatPosition: [2, 1],
    date: "2024-07-09",
    time: "09:30",
    reserver: "5003",
    reserveID: "904"
};

const reservations = [reserve1, reserve2, reserve3, reserve4];

/* --------------------- End of Hard Coded Data ------------------------ */



/* --------------------- Session Login Handling - From sessionsNodeJS ------------------------ */

const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect("/login");
    }
};

app.get("/", (req, res) => {
    if (req.session.user) {
        const userData = req.session.user;

        if (userData.role === "student") {

            res.render('studentPage',{userData});
        }

        else {

            res.render('labtechPage',{userData});
        }
    }
    
    else {
        
        res.sendFile(__dirname + "/index.html");
    }
});
 
app.get("/login", (req, res) => {
    if (req.session.user) {
        const userData = req.session.user;
        if (userData.role === "student") {
            
            res.redirect("/studentPage");
        } 
        
        if (userData.role === "labtech") {
            
            res.redirect("/labtechPage");
        } 
    
    } else {
        res.sendFile(__dirname + "/login.html");
    }
});

app.post("/login", express.urlencoded({ extended: true }), (req, res) => {
    const { email, password } = req.body;
 
    // Check if the provided credentials are valid
    if (email === "timmy_yap@dlsu.edu.ph" && password === "student123") {
        // Store user data in the session
        req.session.user = user1;
        res.cookie("sessionId", req.sessionID);
 
        res.redirect("/studentPage");
    }
    else if (email === "liam_anderson@dlsu.edu.ph" && password === "student123") {
        // Store user data in the session
        req.session.user = user2;
        res.cookie("sessionId", req.sessionID);
 
        res.redirect("/studentPage");
    }
    else if (email === "brad_pitt@dlsu.edu.ph" && password === "student123") {
        // Store user data in the session
        req.session.user = user3;
        res.cookie("sessionId", req.sessionID);
 
        res.redirect("/studentPage");
    }
    else if (email === "john.doe@dlsu.edu.ph" && password === "lab123") {
        // Store user data in the session
        req.session.user = user4;
        res.cookie("sessionId", req.sessionID);
 
        res.redirect("/labtechPage");
    }
    else if (email === "sarah.gateway@dlsu.edu.ph" && password === "lab123") {
        // Store user data in the session
        req.session.user = user5;
        res.cookie("sessionId", req.sessionID);
 
        res.redirect("/labtechPage");
    }
    else if (email === "andrew.meda@dlsu.edu.ph" && password === "lab123") {
        // Store user data in the session
        req.session.user = user6;
        res.cookie("sessionId", req.sessionID);
 
        res.redirect("/labtechPage");
    }
     else {
        res.send("Invalid credentials. <a href='/login'>Please try again.");
    }
});

/* --------------------- SEARCH USERS for students ------------------------ */
app.post("/findUser1", (req, res) => {
    const { userName } = req.body;
    const lowerCaseUserName = userName.toLowerCase();
    const foundUsers = users.filter(user => 
        user.firstName.toLowerCase() === lowerCaseUserName ||
        user.lastName.toLowerCase() === lowerCaseUserName ||
        `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}` === lowerCaseUserName
    );
    if (foundUsers.length > 0) {
        res.render('searchOtherProfile', { users: foundUsers });
    } else {
        res.send("User not found. <a href='/studentView/searchOtherProfile'>Try again.</a>");
    }
});

/* --------------------- SEARCH USERS for LabTechs ------------------------ */
app.post("/findUser2", (req, res) => {
    const { userName } = req.body;
    const lowerCaseUserName = userName.toLowerCase();
    const foundUsers = users.filter(user => 
        user.firstName.toLowerCase() === lowerCaseUserName ||
        user.lastName.toLowerCase() === lowerCaseUserName ||
        `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}` === lowerCaseUserName
    );
    if (foundUsers.length > 0) {
        res.render('LsearchOtherProfile', { users: foundUsers });
    } else {
        res.send("User not found. <a href='/labtechView/LsearchOtherProfile'>Try again.</a>");
    }
});

/* --------------------- SEARCH and EDIT profile for LABTECH ------------------------ */
app.post("/findUserLab2", (req, res) => {
    const { userName } = req.body;
    const lowerCaseUserName = userName.toLowerCase();
    const foundUser = users.find(user => 
        `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}` === lowerCaseUserName ||
        user.firstName.toLowerCase() === lowerCaseUserName ||
        user.lastName.toLowerCase() === lowerCaseUserName
    );
    if (foundUser) {
        req.session.searchedUser = foundUser;  // Store found user in session
        res.redirect("/LViewEditProfile");
    } else {
        res.send("User not found. <a href='searchEditProfile'>Try again.</a>");
    }
});

app.get("/LViewEditProfile", (req, res) => {
    const currUserLab = req.session.searchedUser;
    if (currUserLab) {
        res.render('LViewEditProfile', { userData: currUserLab });
    } else {
        res.send("No user selected. <a href='/searchEditProfile'>Search again.</a>");
    }
});

app.post("/editInfoLab", (req, res) => {
    const currUserLab = req.session.searchedUser;
    if (currUserLab) {
        Object.assign(currUserLab, req.body);
        res.render('LViewEditProfile', { userData: currUserLab });
    } else {
        res.send("No user selected. <a href='/searchEditProfile'>Search again.</a>");
    }
});
/* --------------------- EDIT PROFILE ------------------------ */
app.get("/ViewEditProfile", (req, res) => {
    
    const currUser = req.session.user;
    res.render('ViewEditProfile', { userData: currUser });
});

app.get("/LViewEditProfile", (req, res) => {
    
    const currUserLab = req.session.user;
    res.render('LViewEditProfile', { userData: currUserLab });
});

app.post("/editInfo", (req, res) => {
    
    const currUser = req.session.user;
    res.render('ViewEditProfile', { userData: currUser });
});

app.post("/editInfoLab", (req, res) => {
    
    const currUserLab = req.session.user;
    res.render('LViewEditProfile', { userData: currUserLab });
});


app.get("/studentPage", isAuthenticated, (req, res) => {
    // Retrieve user data from the session
    const userData = req.session.user;
    console.log(userData);
    res.render('studentPage',{userData});
});

app.get("/labtechPage", isAuthenticated, (req, res) => {
    // Retrieve user data from the session
    const userData = req.session.user;
    console.log(userData);
    res.render('labtechPage',{userData});
});
 
app.get("/logout", (req, res) => {
    // Destroy the session and redirect to the login page
    req.session.destroy(() => {
        res.clearCookie("sessionId");
        res.redirect("/");
    });
});



/*
app.get('/submit-student-data', function(req, res) {
	
	var name = req.query.firstName + " " + req.query.lastName;
	res.send (name + " obtained");
});

app.post('/submit-student-data', function(req, res) {
	
	var name = req.body.firstName + " " + req.body.lastName;
	res.send (name + " obtained");
});
*/

var server = app.listen(3000, function() {
	console.log("listening to port 3000...");
});