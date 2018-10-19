const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');

//Passport config
require('./config/passport')(passport);

//Load routes
const auth = require('./routes/auth');


app.get('/', (req, res) => {
  res.send('it works');
})

//Use routes
app.use('/auth', auth);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started at ${port}`);
})