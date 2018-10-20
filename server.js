const express = require('express');
const app = express();
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const passport = require('passport');
const keys = require('./config/keys');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

app.use(cookieparser());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUnitialized: false,

  })
);

//Set Public folder
app.use(express.static(path.join(__dirname, 'public')));

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

//Handlebars Middleware 

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars');

//Load routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const stories = require('./routes/stories');

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//Use routes
app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories);

app.get('/dashboard', (req, res) => {
  res.send('logged in');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
