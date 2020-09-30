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
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;