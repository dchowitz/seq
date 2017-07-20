module.exports = function registerErrorHandlers (app) {
  app.use(notFound)
  app.use(serverErrors(app.get('env')))
}

function notFound (req, res, next) {
  const error = new Error('not found')
  error.status = 404
  next(error)
}

const serverErrors = env => (err, req, res, next) => {
  const details = {
    message: err.message,
    status: err.status || 500,
    stack: false
  }

  if (env === 'development') {
    details.stack = err.stack || ''
  }

  res.status(details.status)
  res.format({
    'text/html': () => res.render('errorPage', highlightStack(details)),
    'application/json': () => res.json(details)
  })
}

function highlightStack (details) {
  if (details.stack) {
    details.stack = details.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  }
  return details
}
