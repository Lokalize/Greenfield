const express = require('express');
const Sequelize = require('sequelize');
const events = require('../models/eventSchema');
const parser = require('body-parser');
const NodeGeocoder = require('node-geocoder');
const participations = require('../models/usersEventsSchema');

let options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: 'AIzaSyAW-bhpsTQLkZsOn_3dVOyde1WwxrIUhqU'
};
let geocoder = NodeGeocoder(options);


exports.formChecks = (req, res, next) => {
  let failure = false;
  let data = {};
  data["name"] = req.body.name;
  data["dinnerType"] = req.body.dinnerType;
  data["date"] = req.body.date;
  data["location"] = req.body.location;
  data["address"] = req.body.address;
  data["capacity"] = req.body.capacity;
  data["userid"] = req.body.userid;
  data["locality"] = req.body.locality;
  data["capacity"] = req.body.capacity;
  if (!data.name){
    res.send({
      success: 'failure',
      message: 'Please enter an Event Name'
    })
    return
  }
  if (data.dinnerType === 'Cuisine'){
    res.send({
      success: 'failure',
      message: 'Please select a Cuisine type'
    })
    return
  }
  if (!data.capacity){
    res.send({
      success: 'failure',
      message: 'Please enter a number for how many people can attend'
    })
    return
  }
  if (!data.locality){
    res.send({
      success: 'failure',
      message: 'Please select a New York Burrow for where your event will take place'
    })
    return
  }
  if (!data.location){
    res.send({
      success: 'failure',
      message: 'Please select a location by clicking on one of the options below locality'
    })
    return
  }
  next()
}


exports.handleForm = (req, res) => {
  console.log('DATA in form handler', data);
  var data = {};
  // data.username = req.body.username;
  // const password = req.body.password;
  data["name"] = req.body.name;
  data["dinnerType"] = req.body.dinnerType;
  data["date"] = req.body.date;
  data["location"] = req.body.location;
  data["address"] = req.body.address;
  data["capacity"] = req.body.capacity;
  data["userid"] = req.body.userid;
  data["locality"] = req.body.locality;
  data["capacity"] = req.body.capacity;
  events.findAll({where:
    {
      name: data.name,
      location: data.location,
      date: data.date
    }
  })
  .then( (exists) => {
    if (exists.length !== 0) {
      res.send('Event already exists!');
      return
    }
    geocoder.geocode(req.body.address)
    .then(function(mapRes) {
      var coords = []
      coords[0] = mapRes[0].latitude;
      coords[1] = mapRes[0].longitude;

      events.create({
        name: data.name,
        dinner_type: data.dinnerType,
        date: data.date,
        capacity: data.capacity,
        location: data.location,
        address: coords,
        capacity: data.capacity,
        userId: data.userid,
        locality: data.locality,
        street: req.body.address
      })
      .then( () => {
         return events.findAll({
          attributes: ['id'],
          where: {
            name: data.name
          }
        })
      })
      .then( (eventId) => {
        participations.create({
          event_id: eventId[0].dataValues.id,
          user_id: data.userid
        })
      })
      .then((data) => {
        res.send({
          message: 'Event Created Successfully!!',
          success: 'success'
        })
      })
      .catch(err => {
        console.log(err)
      });
    })
  });
};
