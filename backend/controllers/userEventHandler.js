const express = require('express');
const Sequelize = require('sequelize');
const sequelize = require('../db.js');
const Users = require('../models/userSchema');
const Events = require('../models/eventSchema');
const Participation = require('../models/usersEventsSchema');
const parser = require('body-parser');


const handleUserEvent = (req, res) => {
  let username = req.query.username;
  console.log('username passed', req.query)
  sequelize.query(`
    select
      name as eventName,
      dinner_type,
      to_char(date, 'Day Mon DD, YYYY') as eventDate,
      location as eventLocation,
      address as coordinates,
      street
    from users u
    join participations on participations.user_id = u.id
    join events on events.id = participations.event_id
    where username = '${username}'
      and date >= current_date
    order by date desc`, { type: sequelize.QueryTypes.SELECT})
    .then(user => {
      res.send(user)
    })
  }

module.exports = handleUserEvent;
