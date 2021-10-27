const fs = require('fs').promises;

module.exports = async function readTalker() {
  try {
    const data = await fs.readFile(`${__dirname}/../talker.json`, 'utf-8');
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};