const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const cookieparser = require('cookie-parser');
const session = require('express-session');

app.use(cookieparser());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUnitialized: false,

  })
);

//Load Models
require('./models/User');

//Connect to mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect(
    keys.mongoURI,
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log('mongoDB connected'))
  .catch(err => console.log(err));

//Passport config
require('./config/passport')(passport);

//Load routes
const auth = require('./routes/auth');

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//Use routes
app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('it works');
});

app.get('/dashboard', (req, res) => {
  res.send('logged in');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
