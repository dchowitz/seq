const express = require('express');
const routes = require('./src/routes');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'src');

app.use(routes);

app.listen(8080, () => {
  console.log('listening on port 8080');
});