const express = require('express');
const app = express();
const mongoose = require('mongoose');

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server started at ${port}`);
})