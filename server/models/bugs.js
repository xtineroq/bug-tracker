const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BugSchema = new Schema({
    id: {
        type: Number,
        unique: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    status: {
        type: String
    },
    priority: {
        type: String
    }
});

const Bug = mongoose.model("Bug", BugSchema);

module.exports = Bug;