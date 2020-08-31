const config = require('config/config.json');
const mongoose = require('mongoose');
// const config = require('config');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, connectionOptions);
mongoose.Promise = global.Promise;

mongoose.connection.on('error', err => {
    console.log(err);;
  });

module.exports = {
    Employee: require('../models/employee/employee.model'),
    Manager: require('../models/manager/manager.model'),
    Project: require('../models/project/project.model'),
};