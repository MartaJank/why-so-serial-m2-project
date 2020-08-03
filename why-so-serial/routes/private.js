var express = require('express');
var router = express.Router();

const parser = require('./../config/cloudinary');

const Killer = require('../models/Killer');
const User = require('../models/User');


/* Session Middleware */
router.use((req, res, next) => {
    if (req.session.currentUser) {
        next();
        return;
    }
    res.redirect('/login');
});

/* Add & Edit killers */

/*router.get('/killers', (req, res, next) => {
    Killer.find()
        .then(allKillers => {
            res.render('killers', { killers: allKillers });
        })
        .catch(error => {
            console.log('Error:', error);
        });
});*/

router.get('/add-killer', (req, res, next) => {
    res.render('private/add-killer');
});


router.post('/add-killer', (req, res, next) => {
    const { name, lastName, aka, gender, murderType, author } = req.body;
    /* const userId = req.session.currentUser._id; */
    const newKiller = new Killer({ name, lastName, aka, gender, murderType });
    if (name === '' || lastName === '' || murderType === '') {
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
                    res.redirect('/killers');
                })
                .catch((err) => {
                    res.render('private/add-killer', { errorMessage: 'Error creating the new Serial Killer' });
                });
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/edit-killer', (req, res, next) => {
    Killer.findOne({ _id: req.query.killer_id })
        .then((killer) => {
            res.render('private/edit-killer', { killer });
        })
        .catch((err) => {
            console.log(error);
        });

});

router.post('/edit-killer', (req, res, next) => {

    const { name, lastName, aka, gender, murderType, birthDate, zodiacSign, yearsActive, numberOfVictimsConfirmed, numberOfVictimsPossible, country, weapons, arrested, victimProfile, description, books } = req.body;

    Killer.update({ _id: req.query.killer_id },
        { $set: { name, lastName, aka, gender, murderType, birthDate, zodiacSign, yearsActive, numberOfVictimsConfirmed, numberOfVictimsPossible, country, weapons, arrested, victimProfile, description, books } }, { new: true }
    )
        .then((killer) => {
            res.redirect('/killers');
        })
        .catch((error) => {
            console.log(error);
        });
});

/* USER PROFILE */

router.get('/profile/:userId', (req, res, next) => {
    let userId = req.params.userId
    User.findById(userId)
        .populate("killersCreated")
        .then((user) => {
            res.render('private/profile', { user });
        })
        .catch(error => {
            console.log('error:', error);
        });
});

router.get('/profile/:userId/edit', (req, res, next) => {
    const userId = req.session.currentUser._id
    User.findOne({ '_id': userId })
        .then((user) => {
            res.render('private/edit-user', { user })
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

    console.log(req.file)

    User.findByIdAndUpdate(
        { _id: userId },
        { $set: { name, email, password, image: image_url } },
        { new: true }
    )
        .then((user) => {
            res.redirect(`/private/profile/${userId}`);
        })
        .catch((error) => {
            console.log(error)
            next(error)
        });
})

module.exports = router;