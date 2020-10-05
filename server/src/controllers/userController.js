const { User } = require("../models");

module.exports = {
  save: (req, res) => {
    User.create(req.body)
      .then((result) => res.status(201).json(result))
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  },
};
