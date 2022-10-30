const NodeCache = require("node-cache");

const CacheModule = new NodeCache({
  stdTTL: 0,
  checkperiod: 0,
  useClones: false,
});

module.exports = CacheModule;
