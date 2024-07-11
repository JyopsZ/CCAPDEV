const mongoose = require('mongoose')

const reserveSchema = new mongoose.Schema({
    labName: String,
    date: String,
    time: String,
    reserver: String,
    image: String
})

const Reservation = mongoose.model('Reservation', reserveSchema)

module.exports = Reservation