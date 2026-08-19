const createCrudRoutes = require('./crudFactory');
const Excursion = require('../models/Excursion');
module.exports = createCrudRoutes(Excursion, 'Excursion');
