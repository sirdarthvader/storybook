const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Story = mongoose.model('stories');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');


//Index Route
router.get('/', (req, res) => {
  res.render('stories/index');
})

//Add Story form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
})

//Process Add form Data
router.post('/', ensureAuthenticated, (req, res) => {
  let allowComments;
  if(req.body.allowComments) {
    allowComments = true
  } else {
    allowComments = false
  } 
  //Create story object
  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id
  }
  //Add story in DB collection
  new Story(newStory).save()
  .then(story => {
    res.redirect(`/stories/show/${story.id}`);
  })
  .catch(err => {
    console.log(err);
  })
})

module.exports  = router;