const express = require('express');
const Sequelize = require('sequelize');
const users = require('../models/userSchema');
const parser = require('body-parser');

exports.handleLogin = (req, res) => {
  var user = {};
  user['username'] = req.body.username;
  user['password'] = req.body.password;
  var usernameExists = users.findOne({where: {username: user.username, password: user.password}})
  .then((usernameExists) => {
    if (usernameExists) {
      res.send(JSON.stringify(usernameExists.id))
    } else {
      res.send(false);
      }
    })
  };
