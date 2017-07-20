const test = require('ava').default
const shortid = require('shortid')
const { homePage, sequencePage, errorPage, driver, until, url } = require('./harness.js')

test('opens when clicking "Create Sequence" in homepage', async t => {
  await homePage.browse()
  await homePage.createSequence()

  const id = await sequencePage.getId()
  t.truthy(shortid.isValid(id), 'sequence has a valid shortid')
  t.is(await sequencePage.getTitle(), `SEQ ${id}`, 'sequence page shows proper title')
  t.is(await sequencePage.getCounter(), '1', 'initial sequence value is 1')
})

test('opens when entering sequence URL', async t => {
  const id = shortid.generate()
  await sequencePage.browse(id)
  t.is(await sequencePage.getId(), id, 'sequence page shows proper id')
})

test('increments sequence counter on reload', async t => {
  const id = shortid.generate()

  await sequencePage.browse(id)
  t.is(await sequencePage.getCounter(), '1', 'counter is 1 on first sequence page access')

  await sequencePage.browse(id)
  await sequencePage.browse(id)
  await sequencePage.browse(id)
  await sequencePage.browse(id)
  t.is(await sequencePage.getCounter(), '5', 'counter is 5 after 4 reloads')
})

test('invalid sequence id causes 500', async t => {
  await sequencePage.browse('xyz') // to short
  t.is(await errorPage.getStatusCode(), '500', 'status code is 500')
  t.is(await errorPage.getMessage(), 'invalid id "xyz"', 'error message says id is invalid')
})
