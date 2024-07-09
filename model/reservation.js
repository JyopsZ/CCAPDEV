const mongoose = require('mongoose')

const reserveSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    time: String,
    reserver: String,
    image: String
})

const Reservation = mongoose.model('Reservation', reserveSchema)

module.exports = Reservation