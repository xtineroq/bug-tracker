const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: "Email address is required",
        validate: [validateEmail, 'Please enter a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        trim: true,
        required: true,
        min: [6, "Password must be at least 6 characters."],
        max: 20
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;