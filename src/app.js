const express = require('express')
const routes = require('./routes')
const errorHandlers = require('./errorHandlers')
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'src')

app.use('/', routes)

errorHandlers(app)

module.exports = app
