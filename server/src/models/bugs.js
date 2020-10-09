const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BugSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    required: true,
  },
  stage: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  assignee: {
    type: String,
    required: true,
  },
  reporter: {
    type: String,
    required: true,
  },
});

const Bug = mongoose.model("Bug", BugSchema);

module.exports = Bug;
