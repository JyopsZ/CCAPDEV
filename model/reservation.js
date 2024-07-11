const mongoose = require('mongoose')

const reserveSchema = new mongoose.Schema({
    labName: String,
    seatPos: [Number],
    date: String,
    time: String,
    reserver: String,
    reservationID: Number
})

const Reservation = mongoose.model('Reservation', reserveSchema)

module.exports = Reservation