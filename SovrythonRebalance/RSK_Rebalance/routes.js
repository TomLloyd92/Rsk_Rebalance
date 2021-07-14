const routes = require('next-routes')();


routes
.add('/campaigns/new', '/campaigns/new')
.add('/campaigns/:address', '/campaigns/show')
.add('/campaigns/:address/rebalance', '/campaigns/rebalance/index')
.add('/campaigns/:address/rebalance/new', '/campaigns/rebalance/new');

module.exports = routes;


