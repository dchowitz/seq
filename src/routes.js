const express = require('express');
const shortid = require('shortid');
const statistics = require('./statistics');
const increment = require('./increment');

const router = express.Router();
module.exports = router;

router.get('/', async (req, res) => {
  const stats = await statistics();
  res.render('homePage', stats);
});

router.post('/new', (req, res) => {
  const id = shortid.generate();
  res.redirect(`/id/${id}`);
});

router.get('/id/:id', async (req, res) => {
  const id = req.params.id;
  if (!id || !shortid.isValid(id)) {
    res.redirect('/');
  }

  const seq = await increment(id);
  res.render('sequencePage', seq);
});