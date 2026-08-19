const createCrudRoutes = require('./crudFactory');
const Villa = require('../models/Villa');
module.exports = createCrudRoutes(Villa, 'Villa');
