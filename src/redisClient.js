const util = require('util');
const redis = require('redis');
const commands = require('redis-commands');

promisify(redis.RedisClient.prototype, commands.list);
promisify(redis.Multi.prototype, ['exec']);

module.exports = redis.createClient();

function promisify(obj, methods) {
  methods.forEach(method => {
    if (typeof obj[method] === 'function') {
      obj[method + 'Async'] = util.promisify(obj[method]);
    }
  });
}