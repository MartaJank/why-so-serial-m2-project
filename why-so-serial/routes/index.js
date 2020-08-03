var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* router.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
    return;
  }
  res.redirect('/login');

});

router.get('/add-killer', (req, res, next) => {
  res.render('private/add-killer');
}); */


module.exports = router;
