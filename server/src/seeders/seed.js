let {Bug} = require("../models");

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

Bug.deleteMany({})
  .then(() => Bug.collection.insertMany(bugSeed))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
