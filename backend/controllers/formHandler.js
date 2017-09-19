const express = require('express');
const Sequelize = require('sequelize');
const events = require('../models/eventSchema');
const parser = require('body-parser');

exports.handleForm = (req, res) => {
  var data = {};
  // data.username = req.body.username;
  // const password = req.body.password;
  data["name"] = req.body.name;
  data["dinnerType"] = req.body.dinnerType;
  data["date"] = req.body.date;
  data["location"] = req.body.location;
  data["capacity"] = req.body.capacity;
  var exists = events.findAll({data})
  .then( (exists) => {
    if (exists) {
      return res.send('Event already exists!');
   }});

  var newEvent = events.create({
    name: data.name,
    dinnerType: data.dinnerType,
    date: data.date,
    location: data.location,
    capacity: data.capacity
  })
  .then((newEvent) => {
    if(newEvent) {
      res.send('Event created!');
    } else {
      console.error('Error: ', err);
    }
  })
  };