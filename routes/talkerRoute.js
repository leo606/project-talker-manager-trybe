const express = require('express');
const readTalker = require('../utils/readTalker');

const route = express.Router();

route.get('/:id', async (req, res, _next) => {
  const { id } = req.params;
  try {
    const data = JSON.parse(await readTalker());
    const talkerIndex = data.findIndex((talker) => talker.id === +id);

    if (talkerIndex < 0) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    res.status(200).json(data[talkerIndex]);
  } catch (error) {
    console.log(error);
  }
});

route.get('/', async (_req, res, _next) => {
  try {
    const data = await readTalker();
    if (!data.length) return res.status(200).json([]);
    return res.status(200).json(JSON.parse(data));
  } catch (error) {
    console.log(error);
  }
});

const tokenCheck = require('../utils/tokenCheck');
const { talkCheck, talkerCheck } = require('../utils/talkerCheck');
const writeTalker = require('../utils/writeTalker');

route.use(tokenCheck);

route.use(talkCheck);

route.use(talkerCheck);

route.use((err, _req, res, _next) => {
  res.status(err.status).json({ message: err.message });
});

route.post('/',
  async (req, res) => {
    try {
      const data = JSON.parse(await readTalker());
      const newTalker = { ...req.body, id: data.length + 1 };
      await writeTalker([...data, newTalker]);
      res.status(201).json(newTalker);
    } catch (error) {
      console.log(error);
    }
  });

module.exports = route;