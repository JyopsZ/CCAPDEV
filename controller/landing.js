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

router.get('/register', function(req, res) {
	res.sendFile(path.join(__dirname + "\\" + "../public/register.html"));
});

router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            role
        });

        await newUser.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;