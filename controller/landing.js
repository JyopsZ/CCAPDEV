var express = require('express');
var router = express.Router();
var path = require('path');
const User = require('../model/user');

router.get('/index', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/index.html"));
});

router.get('/login', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/login.html"));
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).redirect('/login?error=User not found. Please register.');
        }

        // Check if passwords match (insecure for production)
        if (user.password !== password) {
            return res.status(401).redirect('/login?error=Invalid credentials');
        }

        // Store user data in session
        //req.session.userID = user.userID; // Store user in session
        req.session.user = user;

        // Redirect based on user role
        switch (user.role) {
            case 'student':
                res.render('studentPage', {user}); // Redirect to student dashboard or main page
                break;
            case 'labtech':
                res.render('labtechPage', {user}); // Redirect to lab technician dashboard or main page
                break;
            default:
                res.status(403).send('Unauthorized access');
        }
    } catch (error) {
        console.error(error);
        res.status(500).redirect('/login?error=Server error');
    }
});

router.get('/register', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/register.html"));
});

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already exists');
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            role
        });

        await newUser.save();
        res.status(201).redirect('/login');
    } catch (error) {
        console.error(error);
        res.status(500).redirect('/register');
    }
});

router.get("/logout", (req, res) => {
    // Destroy the session and redirect to the login page
    req.session.destroy(() => {
        res.clearCookie("sessionId");
        res.redirect("/");
    });
});

module.exports = router;