const Sequelize = require('sequelize');
const sequelize = require('../db.js');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: Sequelize.STRING,
  password: Sequelize.STRING,
}, {
  timestamps: false
})

// create the table in db

User.sync({ force: false })
  .then(() => {
    console.log('Users table created');
  })
  .catch( (err) => console.error('In USER table', err))

module.exports = User;
