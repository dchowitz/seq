const redis = require('./redisPromisified');
const client = redis.createClient();

module.exports = async function statistics() {
  const count = await client.hlenAsync('created');
  return { count };
};