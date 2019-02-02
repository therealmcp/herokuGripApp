const db = require("../db/models");

// Defining methods for the bookController
module.exports = {
  findAll: function (req, res) {
    db.User.find(req.query)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User.findById(req.params.id)
    .populate("clients")
    .then((dbUser) => {
      // console.log("clients res: --------", dbUser)
    //  db.Client.find({ _id: {$in: res.clients.sessions} })
    //   .populate("sessions").then(clientData => {
    //     return clientData
    //   })
      // .sort({'date': 1})
      var clients = dbUser.clients.map(client => {
        // console.log("CLIENT", client)
        return db.Client.find( { _id: client._id } )
        .populate("sessions")
        .then(session => {
          // console.log("SESSIONS", session)
          return session 
        })
      })
      // console.log("dbSession..........", dbSession)
      return Promise.all(clients).then(client => {
        console.log(client[0])
        return client;
      })
    })
    .then(data => {
      console.log("DB User: ", data)
      res.json(data)
    })
    .catch(err => res.status(422).json(err));
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
