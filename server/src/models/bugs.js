const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BugSchema = new Schema({
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
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    assigneeId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reporterId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

const Bug = mongoose.model("Bug", BugSchema);

module.exports = Bug;