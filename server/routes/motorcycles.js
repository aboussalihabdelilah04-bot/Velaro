const createCrudRoutes = require('./crudFactory');
const Motorcycle = require('../models/Motorcycle');
module.exports = createCrudRoutes(Motorcycle, 'Moto');
