var express = require('express');
var router = express.Router();

const User = require('../models/User');

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



module.exports = router;