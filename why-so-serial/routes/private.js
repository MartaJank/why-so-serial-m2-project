var express = require('express');
var router = express.Router();

const User = require('../models/User');

const parser = require('./../config/cloudinary');

router.get('/profile/:id', (req, res, next) => {
    const userId = req.params.id;

    User.findById(userId, (err, theUser) => {
        if (err) {
          next(err);
          return;
        }
        res.render('profile', { user: theUser });
    })
});

router.get('/profile/:userId/edit', (req, res, next) => {
    let userId = req.params.userId
    User.findOne({'_id': userId})
    .then((user) => {
        res.render('profile', { user })
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
})

router.post('/profile/:userId/edit', parser.single('profilepic'), (req, res, next) => {
    const { name, email, password } = req.body;
    let userId = req.params.userId;
    const image_url = req.file.secure_url;

    User.update(
      { _id: userId },
      { $set: { name, email, password, profilepic: image_url } },
      { new: true }
    )
      .then((user) => {
        res.redirect("/profile/:id");
      })
      .catch((error) => {
        console.log(error)
        next(error)
      });
})

module.exports = router;