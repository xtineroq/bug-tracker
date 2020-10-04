const db = require("../models");
const axios = require("axios");

module.exports = {
  // getUser ID from backend
  getUser: (req, res) => {
    axios
      .get("/user?ID=") // need to know the correct route
      .then((response) => {
        console.log(response);
        res.json(response.data);
      })
      .catch((err) => res.status(422).json(err));
  },
  // find all bugs saved in db
  findAll: (req, res) => {
    db.Bug.find(req.query)
      .then((dbModel) => {
        res.json(dbModel);
        console.log(dbModel);
      })
      .catch((err) => res.status(422).json(err));
  },
  // find bug by id
  findById: (req, res) => {
    db.Bug.findById(req.params.id)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // save bug to db
  save: (req, res) => {
    db.Bug.create(req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // update existing bug in db
  update: (req, res) => {
    db.Bug.findByIdAndUpdate({ _id: req.params.id }, req.body)
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
  // delete bug from dd
  remove: (req, res) => {
    db.Book.findById({ _id: req.params.id })
      .then((dbModel) => dbModel.remove())
      .then((dbModel) => res.json(dbModel))
      .catch((err) => res.status(422).json(err));
  },
};
