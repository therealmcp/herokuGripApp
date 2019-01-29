const db = require("../db/models");

// Defining methods for the sessionController
module.exports = {
  findAll: function (req, res) {
    db.Session.find(req.query)
      .then(dbSession => res.json(dbSession))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Session.findById(req.params.id)
      .then(dbSession => res.json(dbSession))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Session.create(req.body)
      // console.log(req.body)
      .then(function (dbSession) {
        console.log(dbSession)
        return db.Client.findOneAndUpdate({ _id: dbSession.client }, { $push: { sessions: dbSession._id } }, { new: true })
      })
      .then(function (dbClient) { res.json(dbClient) })
      // console.log("---dbClient---", dbClient)
      .catch(err => res.status(422).json(err));
    console.log(req.body);
  },
  update: function (req, res) {
    db.Session.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbSession => res.json(dbSession))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Session.findById(req.params.id)
      .then(dbSession => dbSession.remove())
      .then(dbSession => res.json(dbSession))
      .catch(err => res.status(422).json(err));
  }
};
