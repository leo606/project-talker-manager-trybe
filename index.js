const express = require('express');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

const talkerRoute = require('./routes/talkerRoute');
const loginRoute = require('./routes/loginRoute');

app.use('/login', loginRoute);

app.use('/talker', talkerRoute);

app.listen(PORT, () => {
  console.log('Online');
});
