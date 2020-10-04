let mongoose = require("mongoose");
let db = require("../models");

// connected to MongoDB Atlas
mongoose.connect("mongodb://localhost/bugTracker", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// Bug Collection Seeds
let bugSeed = [
  {
    status: [
      "Backlog",
      "To Do",
      "In Progress",
      "On Staging",
      "Ready for UAT",
      "UAT Approved",
      "Live on Production",
    ],
  },
  {
    priority: ["Blocker", "Critical", "Major", "Minor", "Trivial"],
  },
];

db.Bug.deleteMany({})
  .then(() => db.Bug.collection.insertMany(bugSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
