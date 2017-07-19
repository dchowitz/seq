const express = require('express');
const shortid = require('shortid');
const statistics = require('./statistics');
const increment = require('./increment');

const router = express.Router();
module.exports = router;

router.get('/', catchErrors(
  async function homePage(req, res) {
    const stats = await statistics();
    res.render('homePage', stats);
  }
));

router.post('/new', (req, res) => {
  const id = shortid.generate();
  res.redirect(`/id/${id}`);
});

router.get('/id/:id', catchErrors(
  async function sequencePage(req, res, next) {
    const id = req.params.id;
    if (!shortid.isValid(id)) {
      return next(new Error(`invalid id "${id}"`));
    }
    const seq = await increment(id);
    res.render('sequencePage', seq);
  }
));

/**
 * Wraps a Promise-returning route handler fn for proper error handling.
 */
function catchErrors(fn) {
  return function catchingErrors(req, res, next) {
    return fn(req, res, next).catch(next);
  };
}