const test = require('ava').default
const { homePage } = require('./harness.js')

test('has title "SEQ"', async t => {
  await homePage.browse()
  t.is(await homePage.getTitle(), 'SEQ')
})

test('initially shows no sequences', async t => {
  await homePage.browse()
  t.is(await homePage.getNumberOfSequences(), '0')
})

test('create sequences via button click', async t => {
  await homePage.browse()

  await homePage.createSequence()
  await homePage.browse()
  t.is(await homePage.getNumberOfSequences(), '1')

  await homePage.createSequence()
  await homePage.browse()
  t.is(await homePage.getNumberOfSequences(), '2')

  await homePage.createSequence()
  await homePage.browse()
  t.is(await homePage.getNumberOfSequences(), '3')
})
