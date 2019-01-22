const db = require("../models");

// Defining methods for the bookController
module.exports = {
  findAll: function(req, res) {
    db.Client.find(req.query)
      .then(dbClient => res.json(dbClient))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Client.findById(req.params.id)
      .then(dbClient => res.json(dbClient))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Client.create(req.body)
      .then(dbClient => { 
        return db.Trainer.findOneAndUpdate(_id: <trainer id> ), {$push: { sessions: <client id>}}, { new: true }
      }.then(dbTrainer => res.json(dbTrainer))
      .catch(err => res.status(422).json(err));
      console.log(req.body);
  },
  update: function(req, res) {
    db.Client.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbClient => res.json(dbClient))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Client.findById(req.params.id)
      .then(dbClient => dbClient.remove())
      .then(dbClient => res.json(dbClient))
      .catch(err => res.status(422).json(err));
  }
};
