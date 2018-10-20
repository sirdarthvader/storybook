const express = require('express');
const router = express.Router;


//Index Route
router.get('/', (req, res) => {
  res.render('story/index');
})

//Add Story form
router.get('/stories/add', (req, res) => {
  res.render('story/add');
})

module.exports  = router;