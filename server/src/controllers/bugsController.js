const { Bug } = require("../models");

module.exports = {
  // find all bugs saved in db
  findAll: (_, res) => {
    Bug.find()
      .then((bugs) => res.json(bugs))
      .catch((err) => res.status(422).json(err));
  },
  // find bug by id
  findById: (req, res) => {
    Bug.findById(req.params.id)
      .then((bug) => {
        if (bug !== null) res.status(200).json(bug);
        else res.status(404).json({ message: "Not found" });
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  },
  // save bug to db
  save: (req, res) => {
    Bug.create(req.body)
      .then((bug) => {
        res.status(201).json(bug);
      })
      .catch((err) => {
        console.log(err);
        res.status(422).json(err);
      });
  },
  // update existing bug in db
  update: (req, res) => {
    Bug.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then((bug) => {
        if (bug !== null) res.status(200).json(bug);
        else res.status(404).json({ message: "Not found" });
      })
      .catch((err) => res.status(422).json(err));
  },
  // delete bug from db
  remove: (req, res) => {
    Bug.findByIdAndRemove(req.params.id)
      .then((bug) => {
        if (bug !== null) res.status(200).json(bug);
        else res.status(404).json({ message: "Not found" });
      })
      .catch((err) => {
        res.status(422).json(err);
      });
  },
};
