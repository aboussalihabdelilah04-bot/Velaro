const createCrudRoutes = require('./crudFactory');
const Car = require('../models/Car');
module.exports = createCrudRoutes(Car, 'Voiture');
