const mongoose = require('mongoose')

const reserveSchema = new mongoose.Schema({
    labName: String,
    seatPosition: [Number],
    date: Date,
    time: String,
    reserver: String,
    reserveID: String
})

const Reservation = mongoose.model('Reservation', reserveSchema)

module.exports = Reservation