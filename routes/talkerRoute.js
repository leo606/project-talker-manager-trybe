const express = require('express');
const fs = require('fs').promises;
// const readTalker = require('../utils/readTalker');

const route = express.Router();

route.get('/', async (_req, res, _next) => {
  try {
    const data = await fs.readFile(`${__dirname}/../talker.json`, 'utf-8');
    if (!data.length) return res.status(200).json([]);
    return res.status(200).json(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;