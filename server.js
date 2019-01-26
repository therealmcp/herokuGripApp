// Loading evnironmental variables here
require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo')(session)
const dbConnection = require('./db') // loads our connection to the mongo database
const routes = require("./routes");
const passport = require('./passport')
const app = express()
const PORT = process.env.PORT || 3001

// ===== Middleware ====
app.use(morgan('dev'))
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(bodyParser.json())
app.use(
  session({
    secret: process.env.APP_SECRET || 'this is the default passphrase',
    store: new MongoStore({ mongooseConnection: dbConnection }),
    resave: false,
    saveUninitialized: false
  })
)

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/gripapp",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser

// ===== testing middleware =====
// app.use(function (req, res, next) {
//   console.log('===== passport user =======')
//   console.log(req.session)
//   console.log(req.user)
//   console.log('===== END =======')
//   next()
// })
// testing
app.get(
  '/auth/google/callback',
  (req, res, next) => {
    console.log(`req.user: ${req.user}`)
    console.log('======= /auth/google/callback was called! =====')
    next()
  },
  passport.authenticate('google', {
    successRedirect: 'http://localhost:3000',
    failureRedirect: 'http://localhost:3000/login'
  })
)

/* Express app ROUTING */
app.use('/auth', require('./routes/auth'))
app.use('/api', require('./routes/api'))


// ====== Error handler ====
app.use(function (err, req, res, next) {
  console.log('====== ERROR =======')
  console.error(err.stack)
  res.status(500)
})

// ==== Starting Server =====
app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`)
})