var express = require('express');
var router = express.Router();

const Killer = require('../models/Killer');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

/*router.get('/killers/:killer', (req, res, next) => {
  let killer = req.params.killer
  Killer.find({killer}, {
    lastName: /^{:killer}/
  })
  res.render('killers', {killer})
})*/

router.get('/killers', async(req, res, next) => {
  try {
    let killers = Killer.find();
    await killers.map(killer => {
        console.log('Our killers: ', killer)
        res.render('killers', { killer: killer });
    }) 
} catch (error) {
    console.log('Error while getting killers from DB: ', error);
  }
});

router.get('/killers/:killerId', (req, res, next) => {
  let killerId = req.params.killerId
    Killer.findOne({'_id': killerId})
    .then(killer => {
      if (!killer) {
          return res.status(404).render('not-found');
      }
      res.render("details", { killer })
    })
    .catch(next)
});

module.exports = router;
