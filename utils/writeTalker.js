const fs = require('fs').promises;

module.exports = async function writeTalker(data) {
  try {
    await fs.writeFile(`${__dirname}/../talker.json`, JSON.stringify(data, null, 2));
  } catch (error) {
    console.log(error);
    return error;
  }
};