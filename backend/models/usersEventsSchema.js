const Sequelize = require('sequelize');
const sequelize = require('../db.js');
const Users = require('./userSchema');
const Events = require('./eventSchema');

const Participation = sequelize.define('participations', {
  participation_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  event_id: Sequelize.INTEGER,
  user_id: Sequelize.INTEGER
}, {
  timestamps: false
});


// create the table in db

Participation.sync({force: false})
  .then( () => {
    console.log('Participation table created!');
  })
  .catch( (err) => console.error('In PARTICIPATION table', err));

module.exports = Participation;
