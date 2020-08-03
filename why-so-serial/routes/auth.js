var express = require('express');
var router = express.Router();

const bcrypt = require('bcrypt');
const saltRound = 10;

const User = require('../models/User');


//Get signup

router.get('/signup', (req, res, next) => {
    res.render('auth/signup', { errorMessage: '' });
});

//Post signup

router.post('/signup', (req, res, next) => {
    const { name, email, password } = req.body;
    const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    const isValid = emailRegEx.test(email);


    if (email === '' || password === '') {
        res.render('auth/signup', { errorMessage: 'Enter both mail and password' });
        return;
    }

    if (!isValid) {
        res.render('auth/signup', { errorMessage: 'Invalid email' });
        return;
    }

    User.findOne({ email })
        .then((foundUser) => {
            if (foundUser) {
                res.render('auth/signup', { errorMessage: `${email} is already taken` });
                return;
            }
            const salt = bcrypt.genSaltSync(saltRound);
            const hashPassword = bcrypt.hashSync(password, salt);

            User.create({ name, email, password: hashPassword })
                .then((userCreated) => {
                    req.session.currentUser = userCreated;
                    res.redirect(`/private/profile/${userCreated._id}`);
                })
                .catch((err) => {
                    res.render('auth/signup', { errorMessage: 'Error creating account' });
                });

        })
        .catch((err) => console.log(err));
});



//Get login

router.get('/login', (req, res, next) => {
    res.render('auth/login', { errorMessage: '' });
});

//Post login
router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    if (email === '' || password === '') {
        res.render('auth/login', { errorMessage: 'Enter both email and password to log in' });
        return;
    }
    User.findOne({ email })
        .then((user) => {
            if (!user) {
                res.render('auth/login', { errorMessage: `There isn't an account with email: ${email}` });
                return;
            }
            if (bcrypt.compareSync(password, user.password)) {
                req.session.currentUser = user;
                res.redirect('/');
            } else {
                res.render('auth/login', { errorMessage: 'Invalid password' });
            }

        })
        .catch((err) => {
            next(err);
        });
});


//logout

router.get('/logout', (req, res, next) => {
    if (!req.session.currentUser) {
        res.redirect('/');
        return;
    }

    req.session.destroy((err) => {
        if (err) {
            next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;