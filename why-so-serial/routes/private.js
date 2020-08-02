var express = require('express');
var router = express.Router();

const Killer = require('../models/Killer');
const User = require('../models/User');



router.get('/add-killer', (req, res, next) => {
    res.render('private/add-killer');
});


router.post('/add-killer', (req, res, next) => {
    const { author, name, lastName, aka, gender, murderType } = req.body;

    const newKiller = new Killer({ name, lastName, aka, gender, murderType });
    if (author === '' || name === '' || lastName === '' || murderType === '') {
        res.render('private/add-killer', { errorMessage: 'The fields: author, name, last name and murder type are required' });
        return;
    }
    Killer.findOne({ lastName })
        .then((foundKiller) => {
            if (foundKiller) {
                res.render('private/add-killer', { errorMessage: `The killer ${lastName} already exists in Why So Serial Database` });
                return;
            }
            newKiller.save()
                .then((killer) => {
                    res.redirect('/');
                })
                .catch((err) => {
                    res.render('private/add-killer', { errorMessage: 'Error creating the new Serial Killer' });
                });
        })
        .catch((err) => {
            next(err);
        });



});


module.exports = router;