const client = require('./redisClient')

module.exports = async function increment (id) {
  const now = Date.now()
  const [counter, , created] = await client
    .multi()
    .incr(`counter:${id}`)
    .hsetnx('created', id, now)
    .hset('touched', id, now)
    .hget('created', id)
    .execAsync()

  return { id, counter, created }
}
