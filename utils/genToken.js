function genToken(size) {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  const out = [];
  for (let i = 0; i < size; i += 1) {
    const randomA = Math.ceil(Math.random() * 9);
    const randomB = Math.ceil(Math.random() * 9);
    if (randomA > 5) {
      out.push(randomA);
    } else {
      out.push(letters[randomB]);
    }
  }
  return out.join('');
}

module.exports = genToken;