const express = require('express');
const app = express();
const mongoose = require('mongoose');


app.get('/', (req, res) => {
  res.send('it works');
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started at ${port}`);
})