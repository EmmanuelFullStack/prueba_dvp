const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 }); // TTL 10 min, chequeo cada 2 min

module.exports = cache;