const client = require('./redisClient')

module.exports = async function statistics () {
  const count = await client.hlenAsync('created')
  return { count }
}
