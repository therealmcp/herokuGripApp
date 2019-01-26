const db = require("../db/models");

// Defining methods for the bookController
module.exports = {
  findAll: function (req, res) {
    db.User.find(req.query)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    // db.Trainer.findById(req.params.id)
    db.User.findOne({_id: userid})
    console.log("-----REQ----", req)
    .populate("clients")
    .then((res) => {
      console.log("clients res: ", res)
      // db.Client.find({_id: {$in: res.client.sessions}})
      .populate("sessions")
      // .then(dbListRes => {
  
      // })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
    });
  },
  create: function (req, res) {
    db.User.create(req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.User.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.findById(req.params.id)
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
};
