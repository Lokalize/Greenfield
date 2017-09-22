const express = require('express');
const Sequelize = require('sequelize');
const sequelize = require('../db.js');
const Events = require('../models/eventSchema');
const parser = require('body-parser');
const NodeGeocoder = require('node-geocoder');
const geodist = require('geodist');
const Participations = require('../models/usersEventsSchema.js');


exports.checkUserEvents = (req, res, next) => {
  let user_id = req.body.user_id;
  let date = req.body.date;
  if (!req.body.date) {
    res.send({
      success: 'failure',
      message: 'Please enter a date and try again!!'
    })
    return
  }
  sequelize.query(`
    select *
    from participations
    join events on events.id = participations.event_id
    where participations.user_id = '${user_id}'
      and events.date = '${date}'`,
      { type: sequelize.QueryTypes.SELECT})
    .then(data => {
      if (data.length === 0) {
        next()
      }
      else {
        res.send({
          success: 'failure',
          message: 'Slow Down Party Animal, you already have an event that day, change the date and try again!!'
        })
      }
    })
}

exports.searchEvents = (req, res) => {
  let date = req.body.date;
  let user_id = req.body.user_id
  let type = req.body.dinnerType;
  let address = req.body.address;
  let whereObj = {
    date: date
  };
  if (type) {
    whereObj.dinner_type = type
  }
  if (address) {
    whereObj.locality = address
  }
  console.log(whereObj)
  Events.findAll({
    where: whereObj
  })
  .then( (events) => {
    if (events.length > 0) {
      let randomSelection = Math.floor(Math.random() * events.length)
      let selectedEvent = events[randomSelection]
      Participations.create({
        user_id: user_id,
        event_id: selectedEvent.id
      })
      .then(() => {
        res.send({
          success: 'success',
          message: 'Congradulations!!! You have joined an event!!'
        });
      })
      .catch((err) => {
        console.error(err)
      })
    } else {
      res.send({
        success: 'failure',
        message: 'Cannot Find an Event with your preferences please try again. Or click "Host Event" above to create your own'
      })
    }
  })
};
