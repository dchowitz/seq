const redis = require('./redisPromisified');
const client = redis.createClient();

module.exports = async function increment(id) {
  const now = Date.now();
  const [ counter, _setCreated, created ] = await client
    .multi()
    .incr(`counter:${id}`)
    .hsetnx('created', id, now)
    .hset('touched', id, now)
    .hget('created', id)
    .execAsync();

  return { id, counter, created };
};
