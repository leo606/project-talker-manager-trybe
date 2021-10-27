const express = require('express');
const genToken = require('../utils/genToken');

const route = express.Router();

const loginCheck = require('../utils/loginCheck');

route.use(loginCheck);
route.use((err, _req, res, _next) => {
  res.status(err.status).json({ message: err.message });
});

route.post('/', async (_req, res, _next) => {
  res.status(200).json({ token: genToken(16) });
});

module.exports = route;