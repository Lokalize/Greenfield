const Sequelize = require('sequelize');
const sequelize = require('../db.js');
const Users = require('./userSchema');
const Events = require('./eventSchema');

const Participation = sequelize.define('participations', {
  participation_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

Participation.belongsTo(Events); //import events foreign key (events_uuid)
Participation.belongsTo(Users); //import users foreign key (users_uuid)

// create the table in db

Participation.sync({force: false})
  .then( () => {
    console.log('Participation table created!');
  })
  .catch( (err) => console.error('In PARTICIPATION table', err));

module.exports = Participation;
