const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/', (req, res) => {
  res.render('index/welcome');
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.render('index/dashboard');
})

module.exports = router;