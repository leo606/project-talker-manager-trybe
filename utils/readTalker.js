const fs = require('fs').promises;
// const sdf = require('../talker.json')

module.exports = async function readTalker(path) {
  try {
    const data = await fs.readFile(path, 'utf-8');
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};