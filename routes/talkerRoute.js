const express = require('express');
const readTalker = require('../utils/readTalker');
const writeTalker = require('../utils/writeTalker');
const { talkCheck, talkerCheck } = require('../utils/talkerCheck');
const tokenCheck = require('../utils/tokenCheck');

const route = express.Router();

route.get('/search',
  tokenCheck,
  async (req, res, _next) => {
    const { q } = req.query;
    try {
      const data = JSON.parse(await readTalker());
      if (!q || q === ' ') {
        return res.status(200).json(data);
      }      
      const filtered = data.filter((talker) => talker.name.includes(q));
      res.status(200).json(filtered);
    } catch (error) {
      console.log(error);
    }
  });

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

route.use(tokenCheck);

route.delete('/:id',
  async (req, res, _next) => {
    const { id } = req.params;
    try {
      const data = JSON.parse(await readTalker());
      const deleted = data.filter((talker) => talker.id !== +id);
      await writeTalker(deleted);
      res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
    } catch (error) {
      console.log(error);
    }
  });

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

route.put('/:id',
  async (req, res, _next) => {
    const { id } = req.params;
    try {
      const data = JSON.parse(await readTalker());
      const talkerIndex = data.findIndex((talker) => talker.id === +id);
      data[talkerIndex] = { ...req.body, id: +id };
      await writeTalker(data);
      res.status(200).json({ ...req.body, id: +id });
    } catch (error) {
      console.log(error);
    }
  });

module.exports = route;