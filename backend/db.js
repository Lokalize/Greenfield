const Sequelize = require('sequelize');

sequelize = new Sequelize('lokalize', 'sss4', 'starfish', {
  host: 'lokalize.cuh8jnsx4027.us-east-2.rds.amazonaws.com',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
