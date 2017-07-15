const util = require('util');
const redis = require('redis');

module.exports = redis;

promisify(redis.RedisClient.prototype, 'hlen');
promisify(redis.Multi.prototype, 'exec');

function promisify(obj, ...methods) {
  methods.forEach(method => {
    obj[method + 'Async'] = util.promisify(obj[method]);
  });
}