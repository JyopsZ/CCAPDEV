const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
    image: String,
    profileID: String
})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile