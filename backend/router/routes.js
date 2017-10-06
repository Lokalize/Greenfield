const express = require('express');
const router = require('express').Router();

const signupHandler = require('../controllers/signupHandler');
const loginHandler = require('../controllers/loginHandler');
const formHandler = require('../controllers/formHandler');
const searchHandler = require('../controllers/searchHandler');
const handleUserEvent = require('../controllers/userEventHandler');

router.post('/signup', signupHandler.handleSignup);

router.post('/login', loginHandler.handleLogin);

router.post('/form', formHandler.formChecks, searchHandler.checkUserEvents,  formHandler.handleForm);

router.post('/search', searchHandler.checkUserEvents, searchHandler.searchEvents); //this has middleware to detect if user already has an event that day

router.get('/home', handleUserEvent);

module.exports = router;
