var express = require('express');
var router = express.Router();

const Killer = require('../models/Killer');
const User = require('../models/User');
const parser = require('./../config/cloudinary');


router.use((req, res, next) => {
    if (req.session.currentUser) {
        next();
        return;
    }

    res.redirect('/login');
});

/* router.get('/killers', (req, res, next) => {
    Killer.find()
        .then(allKillers => {
            res.render('killers', { killers: allKillers });
        })
        .catch(error => {
            console.log('Error:', error);
        });
}); */

router.get('/add-killer', (req, res, next) => {
    res.render('private/add-killer');
});


router.post('/add-killer', parser.single('photo'), (req, res, next) => {
    const { name, lastName, aka, gender, murderType } = req.body;
    const imgPath = req.file.url;
    const userId = req.session.currentUser._id;
    const userInfo = { isAuthor: true };
    const newKiller = new Killer({ name, lastName, aka, gender, murderType, author: userId, image: imgPath });
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
                    User.findByIdAndUpdate(userId, { $set: userInfo, $push: { killersCreated: killer._id } }, { new: true })
                        .then((user) => {
                            req.session.currentUser = user;
                            res.redirect('/killers');
                        })
                        .catch((err) => {
                            next(err);
                        });
                })
                .catch((err) => {
                    res.render('private/add-killer', { errorMessage: 'Error creating the new Serial Killer' });
                });
        })
        .catch((err) => {

        });




});

router.get('/edit-killer', (req, res, next) => {
    Killer.findOne({ _id: req.query.killer_id })
        .then((killer) => {
            res.render('private/edit-killer', { killer });
        })
        .catch((err) => {
            next(err);
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

/* router.get('/killer/:killerId', (req, res, next) => {
    Killer.findById(req.params.killerId)
        .then(theKiller => {
            res.render('killer-details', { killer: theKiller });
        })
        .catch(error => {
            console.log('error:', error);
        });
}); */





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
    let userId = req.params.userId;
    User.findOne({ '_id': userId })
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