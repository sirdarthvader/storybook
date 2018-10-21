const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Story = mongoose.model('stories');
const { ensureAuthenticated, ensureGuest } = require('../helpers/auth');

//Index Route
router.get('/', (req, res) => {
  Story.find({ status: 'public' })
    .populate('user')
    .then(stories => {
      res.render('stories/index', {
        stories: stories,
      });
    });
});

//Add Story form
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('stories/add');
});

//Process Add form Data
router.post('/', ensureAuthenticated, (req, res) => {
  let allowComments;
  if (req.body.allowComments) {
    allowComments = true;
  } else {
    allowComments = false;
  }
  console.log(req.body.status);
  //Create story object
  const newStory = {
    title: req.body.title,
    body: req.body.body,
    status: req.body.status,
    allowComments: allowComments,
    user: req.user.id,
  };
  //Add story in DB collection
  new Story(newStory)
    .save()
    .then(story => {
      res.redirect(`/stories/show/${story.id}`);
    })
    .catch(err => {
      console.log(err);
    });
});

//Show Single Story
router.get('/show/:id', (req, res) => {
  const id = req.params.id;
  Story.findOne({
    _id: id,
  })
    .populate('user')
    .then(story => {
      res.render('stories/show', {
        story: story,
      });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  Story.findOne({
    _id: id,
  })
    .then(story => {
      res.render('stories/edit', {
        story: story,
      });
    })
    .catch(err => {
      console.log(err);
    });
})

module.exports = router;
