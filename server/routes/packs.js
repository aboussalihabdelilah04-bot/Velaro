const createCrudRoutes = require('./crudFactory');
const Pack = require('../models/Pack');
module.exports = createCrudRoutes(Pack, 'Pack');
