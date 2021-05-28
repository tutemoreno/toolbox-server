import express from 'express';
import './database.js';

import Router from './routes/index.js';

const app = express();

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

//routes
app.use(Router);

app.listen(4000);
console.log('Server on port', 4000);
