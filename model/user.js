// model/user.js
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, default: null },
    userID: { type: Number, unique: true }
});

// Add the auto-increment plugin to the schema
userSchema.plugin(AutoIncrement, { inc_field: 'userID', start_seq: 5004 });

const User = mongoose.model('User', userSchema);

module.exports = User;
