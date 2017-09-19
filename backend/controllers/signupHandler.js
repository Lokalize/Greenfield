const express = require('express');
const Sequelize = require('sequelize');
const users = require('../models/userSchema');
const parser = require('body-parser');

exports.handleSignup = (req, res) => {
  var user = {};
  user['username'] = req.body.username;
  user['password'] = req.body.password;
  var usernameAlreadyInUse = users.findOne({where: {username: user.username}})
  .then((usernameAlreadyInUse) => {
    if (usernameAlreadyInUse) {
      res.send('username already in use, please pick another username');
      res.redirect('/signup');
    } else {
      var newUser = users.create({
        username: user.username,
        password: user.password
      })
      .then((newUser) => {
        if (newUser) {
          res.send('new user created!');
        } else {
          console.error('Error:', err);
        }
      })
    }
  })
};
