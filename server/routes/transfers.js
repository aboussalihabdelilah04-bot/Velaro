const createCrudRoutes = require('./crudFactory');
const Transfer = require('../models/Transfer');
module.exports = createCrudRoutes(Transfer, 'Transfert');
