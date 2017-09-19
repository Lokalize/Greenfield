const express = require('express');
const router = require('express').Router();

const signupHandler = require('../controllers/signupHandler');
const loginHandler = require('../controllers/loginHandler');
const formHandler = require('../controllers/formHandler');
const searchHandler = require('../controllers/searchHandler');

router.post('/signup', signupHandler.handleSignup);

// router.get('/login', loginHandler);

// router.get('/logout'); //need to destroy session

router.post('/form', formHandler.handleForm);

router.post('/search', searchHandler.searchEvents);

module.exports = router;