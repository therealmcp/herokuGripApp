const db = require("../db/models");

// Defining methods for the bookController
module.exports = {
  findAll: function (req, res) {
    db.Client.find(req.query)
      .then(dbClient => res.json(dbClient))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Client.findById(req.params.id)
      .then(dbClient => res.json(dbClient))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Client.create(req.body)
      // console.log(req.body)
      .then(function (dbClient) {
        console.log(dbClient)
        return db.User.findOneAndUpdate({ _id: dbClient.user }, { $push: { clients: dbClient._id } }, { new: true })
      })
      .then(function (dbUser) { res.json(dbUser) })
      // console.log("---dbUser---", dbUser)
      .catch(err => res.status(422).json(err));
    console.log(req.body);
  },
  update: function (req, res) {
    db.Client.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbClient => res.json(dbClient))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Client.findById(req.params.id)
      .then(dbClient => dbClient.remove())
      .then(dbClient => res.json(dbClient))
      .catch(err => res.status(422).json(err));
  }
};
