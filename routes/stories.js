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
    .populate('comments.commentUser')
    .then(story => {
      res.render('stories/show', {
        story: story,
      });
    })
    .catch(err => {
      console.log(err);
    });
});

//Edit Single Story
router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  Story.findOne({
    _id: id,
  })
    .then(story => {
      if(story.user != req.user.id) {
        res.redirect('/stories');
      } else {
        res.render('stories/edit', {
          story: story,
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
})


//Process edit form
router.put('/:id', (req, res) => {
  Story.findOne({
    _id: req.params.id
  })
  .then(story => {
    let allowComments;
    if(req.body.allowComments) {
      allowComments = true
    } else {
      allowComments = false
    }
    story.title = req.body.title;
    story.status = req.body.status;
    story.allowComments = allowComments;
    story.body = req.body.body;

    story.save()
    .then(stroy => {
      res.redirect('/dashboard');
    })
    .catch(err => {
      console.log(err);
    })
  })
  .catch(err => {
    console.log(err);
  })
})

//Delete form 
router.delete('/:id', (req, res) => {
  Story.remove({_id: req.params.id})
  .then(() => {
    res.redirect('/dashboard');
  })
  .catch(err => {
    console.error(err);
  })
})

//Add a comment 
router.post('/comment/:id', (req, res)=> {
  Story.findOne({
    _id: req.params.id
  })
  .then(story => {
    const newComment = {
      commentBody: req.body.commentBody,
      commentUser: req.user.id
    }
    story.comments.unshift(newComment);
    story.save()
    .then(story => {
      res.redirect(`/stories/show/${story.id}`)
    })
    .catch(err => {
      console.log(err);
    })
  })
  .catch(err => {
      console.log(err);
  })
})


//List story from a single user
router.get('/user/:userId', (req, res) => {
  Story.find({user: req.params.userId, status: 'public'})
  .populate('user')
  .then(stories => {
    res.render('stories/index', {
      stories: stories
    });
  })
})

//Show story from a loggedIN user
router.get('/my', (req, res) => {
  Story.find({user: req.user.id,})
  .populate('user')
  .then(stories => {
    res.render('stories/index', {
      stories: stories
    });
  })
})


module.exports = router;
