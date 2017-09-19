const express = require('express');
const Sequelize = require('sequelize');
const Events = require('../models/eventSchema');
const parser = require('body-parser');

exports.searchEvents = (req, res) => {
  var address = req.body.address;
  var date = req.body.date;
  var type = req.body.dinnerType;

  Events.findAll({
    where: {
    //  date: date,
      dinnerType: type
    }
  })
  .then( (events) => {
    if (events.length > 0) {
      res.send(events);
    } else {
      res.send('There were no events matching your search, but we encourage you to be the first!')
    }
  })
};
