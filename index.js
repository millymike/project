/* eslint-disable global-require */
require('dotenv').config(); // create global access for env variables
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT, DATABASE_URL } = require('./config');
const logger = require('./utils/logger');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect(DATABASE_URL, { useNewUrlParser: true }).then(() => {
  logger.info('Db Connected!');
}).catch((err) => {
  logger.error('Db Connection failed');
  logger.error(err);
});

app.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Origin',
    'x-access-token, Origin, Content-Type, Accept',
  );

  return next();
});
app.get('/', (_req, res) => {
  logger.info('ROOT ROUTE!');
  return res.status(200).json({ message: 'ok' });
});
app.use('/users', require('./routes/users.routes'));

app.use((_req, res) => res.status(404).json({ message: 'NotFound' }));

app.listen(PORT, () => logger.info(`Server started on: ${PORT}`));
